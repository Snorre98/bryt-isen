# Teknologistakken

#### Frontend

For å bygge frontend brukergrensesnitt(UI) og skrive frontend-logikk bruker vi React med TypeScript. Det blir også brukt CSS rammeverket Bootstrap.

React er et modent, mye brukt JavaScript bibliotek for å bygge UI med et stort økosystem og godt dokumentasjon. React er spesielt godt egnet til å bygge frontend komponenter og behandle tilstanden til disse komponentene. Ved å utvikle frontend med komponenter i fokus vil det være enklere å jobbe både iterativt og som team, da større løsninger kan deles opp i flere komponenter som enkelt kan fordeles som arbeidsoppgaver for utviklere.

Et aspekt av React som kan være en fordel og en ulempe er at det er ekstremt modulært, som fører til at det vanligvis trengs flere biblioteker for å sørge for funksjonalitet som React ikke kommer med ut av boksen. Et eksempel er frontend routing, som kan takles med det eksterne biblioteket React Routing. Fordi React er så mye brukt finnes det også mye dokumentasjon på disse eksterne bibliotekene. På grunn av dette, i tillegg til at omfanget for prosjektet er relativt lite, tror vi at React er en passende webteknologi for å bygge UI for vår webapplikasjon.

Vi utnytter Bootstrap for å gjøre utviklingen av frontend komponenter raskere og slik at vi kan unngå å måtte skrive store mengder CSS for å lage en godt designet og responsiv web-applikasjon. Vi har tatt et bevisst valg på å bruke vanlig Bootstrap i stedet for react-bootstrap, da Bootstrap har over tre ganger flere brukere og fordi react-bootstrap kan være mer restriktivt for noen bruksområder. En ulempe med å bruke rammeverk som Bootstrap er at de ofte kan ha hyppige oppdateringer som gjør at utviklere må holde tritt med disse oppdateringene for å vedlikeholde kodenbasen for en tjeneste. Vi mener dette ikke vil være et stort problem for dette prosjektet, da prosjekt bare går over noen måneder og det er lite sannsynlig store oppdateringer til Bootstrap til bli lansert. Om man skulle se for seg at prosjektet skal videreutvikles i etterkant av faget ville det uansett ikke vært spesielt krevende å erstatte Bootstrap med andre løsninger eller kun normal CSS.

TypeScript(TS) er et superset av JavaScript som blant annet introduserer strenge typer til JavaScript, derav navnet “Type”-Script. Syntaks i TS har noen likheter med JavaScript og Java, men mange mener syntaksen er enklere enn Java-syntaks. Gitt at et flertall i teamer har erfaring med enten JavaScript eller Java så vil læringskurven for å lære syntaksen være slakere.

De med erfaring fra Java er dermed kjent med et strengt typet språk og hvordan dette påvirker utviklingsprosessen. For middels til store prosjekter kan typede språk være hjelpsomt når det kommer til debugging og kan kjøre koden mer lesbar. TypeScript kaster type-feil som kan føre til høyere kodekvalitet, minker sannsynligheten for kritiske feil i koden og kan gjøre det enklere for en person som ikke har skrevet koden til å forstå koden. Selv om TypeScript sier ifra om typefeil og konflikter relatert til typer så kan man ignorere dette i stor grad. Det stopper heller ikke koden fra å kompilere og kjøre. En ulempe assosiert med typede språk er at det kan være noe vanskeligere å lære, men siden flere på gruppa har erfaring med typede språk tror vi fordelene med TypeScript overveier ulempene.

#### Backend

For å skrive backend-logikk, strukturere data og å behandle en database bruker vi Django med Python. Vi bruker Django REST Framework for å lage REST API tjenester.

Django er et mye brukt backend web-rammeverk som kommer med mye funksjonalitet ut av boksen og veldig god dokumentasjon. Siden produkteier blant annet etterspør funksjonalitet hvor brukere skal kunne logge inn og en form for å kunne administrere innholdet i webapplikasjonen er Django spesielt godt egnet. Django har innebygd støtte for brukerautentisering og kommer med et ferdig admin-panel. Django tillater for å skrive oversiktlig kode med en objekt-orientert tilnærming. Rammeverket gjør det også mulig å behandle en database ved å skrive Python kode, altså trenger man ikke skrive SQL. Dette er et stort pluss fordi det ikke er stor kompetanse for SQL i gruppa, samtidig har alle gruppemedlemmer erfaring med Python. En annen stor fordel med Django er at det forenkler Model-View-Controller programvare designet til noe som ofte kalles Model-View-Template design, hvor view-laget tar rollen til både view og controller. Laget som sørger for at data vises til brukeren og laget som står for kontroll av backend-logikk kombineres, noe som kan være mer intuitivt for nye programvareutviklere.

Django REST Framework(DRF) er et eksternt bibliotek som er godt integrert og mye brukt samme med Django for å skrive REST API tjenester. Dette brukes altså for å nå data i databasen fra frontend. DRF har støtte for serialisering, autentisering og validering av høy kvalitet slik at det kan tillates å bruke mindre tid på å ta gode avgjørelser og utvikle disse nødvendige funksjonene.