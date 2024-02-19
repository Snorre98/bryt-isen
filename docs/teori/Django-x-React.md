# Django X React prosjekt 

Denne teksten forklarer strukturen i et Django x React prosjekt og hvordan
man jobber med prosjektet. Her brukes ordet "prosjekt" for å beskrive filstrukturen og konfigurasjoner som gjør at kodebasen danner et utviklingsmiljø og et produkt (en webapplikasjon).

## Hvorfor frontend og backend?

Man kan se at prosjektet hovedsaklig er delt inn i backend og frontend, andre prosjekter deler kanskje inn i server og klient, men den underliggende funksjonaliteten er veldig lik.

Fra et veldig forenklet og overflødig perspektiv kan man se to grunner til å dele inn prosjektet i backend og frontend.

1) De forskjellige områdene i prosjektet utfører veldig forskjellige operasjoner.

2) De to forskjellige områdene kjører på forksjellige maskiner i produksjon.

Både frontend og backend er konfigurert med forskjellige dependencies (avhengigheter). Dette er flere distinkte programmvarer som både gjør teknologiene vi bruker mulig, men også danner utviklingsmiljøet. Man trenger ikke forstå så mye av dette for å utvikle på prosjektet, men noen ting kan være greit å ha hørt om og derfor står det mer om denne delen av prosjektet i siste del av denne teksten.

## Den viktige delen av filstrukturen

*Det viktigste er markert med 🦄*

**bryt-isen/**
|
|--📂 **frontend/**
|------------------📂 **src/**
|---------------------------📂 **assets/**
|---------------------------📂 [**components/**](#📂components-og-pages) 🦄
|---------------------------📂 [**pages/**](#📂components-og-pages)   🦄
|---------------------------📂 **rotues/**
|---------------------------📂 **styles/**
|---------------------------📃 main.tsx
|---------------------------📃 [dto.ts]((#📃apits-og-dtots))   🦄
|---------------------------📃 [api.ts](#📃apits-og-dtots)   🦄
|------------------📦 package.json
|
|--📍 docs
|
|--📂 **backend/**
|------------------📂 **brytisen/**
|---------------------------📃 [views.py](#views) 🦄
|---------------------------📃 [serializers.py](#serializers)   🦄
|---------------------------📃 [models.py](#models)    🦄
|---------------------------📃 [admin.py](/)
|---------------------------📃 [urls.py](#urls)  🦄
|------------------📂 **media/**
|------------------📂 **root/**
|---------------------------[urls.py](#urls) 🦄
|------------------🗄️ db.sqlite3
|------------------📃 manage.py
|------------------📦 Pipfile


### Django - backend
*Vi starter på det "dypeste" og svømmer oppover i stacken*.

#### 📂Brytisen/backend/

Django legger opp til at man bygger 'apper' i backend. Vi har bare en app, *brytisen*, men man kunne sett for seg f.eks. *brukerinnlegg-vegge* og *messenger* som to forskjellige apps i samme Django prosjekt.(bare et eksempel  jeg tror ikke FaceBook bruker Django til dette)

**YO!** Django inneholder ganske mye funksjonalitet som kan se komplisert ut, men som fort viser seg å være mer enkelt å bruke i praksis. Hvis det er noe du ikke forstår i Django syntaksen/koden kan det være fordi det foregår noe komplekst i bakgrunn som vi ikke trenger å bry oss om, som for oss i praksis vil innebære å kalle på metoder og bruke klasser innebygd i Django.

##### 📃Models

En modell er kilden til informasjon om data i databasen. Modellen inneholder datafalter og oppførselen til dataen som lagres. Normalt vil hver model representere en eneste database tabell (entitet).

- Hver model er en Python klasse som blir en subklasse av django.db.models.Model klassen.
- Hver attribut i modellen representerer et database felt.
- ✨Django genererer automatisk database definisjonen for oss, med mye mer ✨
- Django genererer automatisk IDer for hvert dataobjekt som dannes fra en modell

Når du har skrevet en modell, f.eks.:

``` python
from django.db import models

class Review(models.Model):
    review_text = models.TextField(max_length=30)
    rating = models.IntegerField(null=False, blank=False, unique=False)
    models.ForeignKey(User, on_delete=models.CASCADE)
```

vil Django sørger for at dette blir definert i databasen som en tabell.

🚨Men, for å generere disse definisjonene må vi lage migrasjonsfiler og migrer de, for at modellene våre faktisk representere datastrukturer i databasen. Dette gjøre man ved å kjøre disse kommandoene i denne rekkefølgen.

``` bash
# 👀 fra backend/
pipenv run python manage.py makemigrations
```

``` bash
# 👀 fra backend/
pipenv run python manage.py migrate
```

Dette vil generere filer i *migrations/* mappen som definere databasen.

**Dette** er egentlig alt man trenger å forholde seg til i modell filen, bortsett fra at man må tenke på design av dataobjektene osv.

Det kan være verdt å vite at `makemigrations` og `migrate` kjøres når Docker🐳 starter, som også vil generere databasedefinisjonene på samme måte som hvis man hadde kjøre kommandoene over.

##### 📃Views

View eller view-funksjoner er Python funksjoner som tar imot web-requests og returnere en respons, for eksempel data eller en HTTP-kode (404, 202, 400, etc.)

Dette er altså en portal fra frontend til backend og det kalles view fordi dette er klientens(brukerens) tilgang til backend og databasen.

I vårt prosjekt er view-funksjoner ofte veldig enkle. Dette er fordi vi bruker Django REST Framework, som forenkler syntaksen litt og abstrahere vekk noe kompleksitet.

``` python
class ListUsers(APIView):
    authentication_classes = [IsAuthenticated]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        usernames = [user.username for user in User.objects.all()]

        return Response(usernames)
```

På grunn av at vi bruker Django REST Framework trenger vi i bunn og grunn bare å skrive det vi ser nødvendig av getters(get) og setters (post/put/create) i mer eller mindre normal Python syntaks. **Ofte finne man tutorials som gjør views mer komplisert enn det vi trenger**

🚨 Vi definere API kall i frontend som kommuniserer med view-funksjonene. Kommer tilbake til dette senere.

##### 📃Serializers

Selve ordet sier ikke så mye og hva serializers gjør, men hovedsaklig oversetter serializers data fra et format til et annet. Dette innebærer operasjonene *serializering* og *deserializering*.

- Deserialisering: konvertere JSON data til Django modell instanser
- Serializere: konvertere Django modell instanser til JSON data.

Serializers utfører også validering av data og autentisering av data. Det er i serializerings-funksjoner man sjekker om en bruker skal ha tilgang til en gitt tabell i databasen eller man passer på at dataen som kommer inn ikke er skaldelig før den lagres i databasen.

Validering og autentisering er også noe Django og Dajago REST Framework kan gjøre for oss. Det kan være litt forvirrende og "magisk" i starten, men etterhvert så ser man at man egentlig bare skriver ganske normal Python kode og kaller på metoder og klasser i Django/Django-RFW for å gjøre jobben.

Serializers er nok det mest kompliserte som foregår i backend, men i dette prosjektet kan vi sannsynligivs holde det veldig enkelt.

[Les mer om serializering her!](https://www.django-rest-framework.org/api-guide/serializers/#serializers)


###### JSON
I fjor hadde jeg webutvikling hvor jeg jobbet en del med JSON. Det er egentlig ganske enkelt, men jeg var forvirret i starten fordi jeg ikke forso at det var så enkelt. (+ vi jobbet med ganske stygge dataobjekter)

*JSON står for JavaScript Object Notation og er et ekstremt mye brukt dataformat innen både webutvikling og programmvareutvikling.*

*JSON kan se slik ut:*

``` javascript

var data = {
            "user": {
                "username": "snosaet",
                "first_name":"snorre",
                "last_name":"sæther",
                "favorites": ["tika-masala", "pizza", "burger"],
                "order_id": 666,
            }
        }

```

*Man henter ut informasjonene i JSON data slik:*

`data.user.username` gir "snosaet"
`data.user.favorites[1]` gir "pizza"

##### URLs

Filen som inneholder URLs i *brytisen/* mappen er spesifikk til den appen filen ligger i, altså *brytisen*. Den andre url mappen som finnes i *backend/* mappen inneholde mer overordnede URLer.

[urls.py](#) inneholder rutene som API kallene i frontend kan nå views-funksjoene på. Siden vi bruker Django REST Framework er det å definere disse rutene ganske enkelt.

Eksempel:
``` python
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'accounts', AccountViewSet)
urlpatterns = router.urls
```

I dette eksempelet blir det generert ruter til view-funksjonene som reflekterer brukere og kontorer. Disse API-endepunktene(målet i ruten) blir automatisk generert:

URL pattern: `^users/$` ---- Navn: `'user-list'`
URL pattern: `^users/{pk}/$` ---- Navn: `'user-detail'`
URL pattern: `^accounts/$ `---- Navn: 'account-list'
URL pattern: `^accounts/{pk}/$` ---- Navn: `'account-detail'`

*pk står for primærnøkkel*

[Les mer om urls her.](https://www.django-rest-framework.org/api-guide/routers/)


### React + TypeScript 

Det mest forvirrende med å jobbe i frontend i starten er at det er mange konsepter å forholde seg til som har en veldig flytende overgang, slik at det kan være vanskelig å skjønne hva man faktisk jobber med.

Vi bruker:

- React og Bootstrap for å bygge komponenter.
  - Dette erstatter og løser HTML og CSS på en smart og moderne måte.
  - React er i bunn og grunn JavaScript som manipulere HTML og CSS i bakgrunn.
  - Bootstrap kjøre dette enda enklere ved å introdusere ferdiglagde komponenter mm.


- TypeScript for å skrive kode.
  - Alt av logikk, om det skulle være API-kall, for-løkker eller å avgjøre hvilken kondisjon som må tilfredstilles for å vise en komponent, skrives i TypeScript.

#### 📂Brytisen/frontend

##### 📃API.ts og dto.ts

I api.ts defineres HTTP request som etterspør å enten hente eller sette data fra/i databasen. Vi bruker rammeverket Axios for dette, så noe av syntaksen man finner i api.ts er axios syntaks. 

Alle api kallene er det man kaller "asynkrone" funksjoner, det vil si at man forventer at deler av funksjonene ikke vil være 'tilgjengelig' i det funksjonen starter. Dette gir mening siden vi i noen tilfeller venter på data eller respons fra backend.

Det er en del kommentarer i koden i api.ts som det kan være greit å se på, men dette er kode sannsynligvis kan kokes. Altså bare kopier det som allerede er gjort, endre funksjonsnavn og sørge for spesialtilfeller.

dto.ts inneholder en gjennspeiling av hvordan JSON dataen som kommer fra backend vil se ut. Dette er altså data-typer vi definere for hvert objekt/modell vi på et elle annet tidspunkt skal jobbe med. DTO står for Data Transfer Object og er veldig hjelpsomt når man skal behandle data i frontend som kommer fra backend. Dette kan virke litt kunstig i vårt tilfelle, men du kan se for det hvordan det ville vært å jobbe i frontend med data fra backend hvis frontend og backend ikke kjører på samme maskin.

Det å bruke DTOer gjør også TypeScript veldig glad.

##### 📂components og pages

Dette er hvor man legger komponentene og sidene vi bygger. 

Her ligger det også veldig mye kokbar kode, samtidig som det finnes veldig mange gode hjelpemiddler på [react-bootstrap](https://react-bootstrap.github.io/docs/components/accordion).

Et mål i frontend kan være å prøve å holde filene ryddige og kanskje separere litt TypeScript kode og React komponenter, altså ved å skrive funksjoner i egne TypeScript filer, som man henter og bruker i React filene(.tsx).

I frontend er det veldig få "regler" for hvordan ting må gjøres, så det kan være litt lettere å få gjort unna arbeid her, men som sagt er det mange kosepter som flyter veldig over i hverandre.

TSX i .tsx står for TypeScript XML og bygger på JavaScript XML. Dette er altså TypeScript/JavaScript sammen med HTML/XML som gjør det enklere å bygge frontend-komponenter. Om man skulle sørget for all logikken som React gjør i bakgrunn ville det blitt veldig mye arbeid. Det er derfor internett var så kjedelig før i tiden, [altså før FaceBook lagde React i 2013](https://en.wikipedia.org/wiki/React_(software)).


### Avsluttende ord

Det er ikke så viktig at man følger seg helt trygg på det tekniske for å få gjennomført dette gruppeprosjeket. Mye av det mest kompliserte er unnagjort og vi kan nok ta det gankse rolig og bygge på det som allerede er gjort til nå.

**Hvis man virkelig vil** forstå hva det er som foregår i kode-prosjekte må man trykke seg rundt i alle filene, se hvordan de henger sammen og hva de importere av både eksterne og interne filer  klasser og metoder. 

Man burde også lese [Django dokumentasjon](https://docs.djangoproject.com/en/5.0/intro/tutorial02/) for å forstå modeller.

[Django REST Framework dokumentasjon](https://www.django-rest-framework.org/tutorial/quickstart/) er nice for å forstå hvordan vi i vårt prosjekt bruker serializering og views.

Det kan være smart å se på dokumentasjonen og sammlinge hva det er snakk om der med det som allerede er gjort i kodeprosjektet vårt, slik at man forstår omfanget av hva man trenger å se etter i dokumentasjoene og hva som faktisk er relevant.

For å få bedre forståelse av hva som foregår i frontend kan man lese [React dokumenatasjon](https://react.dev/learn/thinking-in-react), men også bare leke seg litt med komponenter. 

Jeg tror det vi bruker TypeScript til egentlig er ganske kjent for mange, gitt at det handler om å skrive logikk, men det kan være litt mer komplisert å utnytte TypeScript sammen med React til sitt fulleste. For å få bedre innsikt i dette kan man enten lese TypeScript dokumentasjon eller se på hvordan [JavaScript virker sammen med HTML og CSS](https://www.w3schools.com/js/js_htmldom_methods.asp) for å få en liten start.
