import { Button, Card } from 'react-bootstrap'
import img from '../assets/chess-drinking.jpg'

function CardComp() {
   return(
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Drikkelek</Card.Title>
        <Card.Text>
          Beskrivelse av denne drikkeleken.
        </Card.Text>
        <Button variant="primary">Beskrivelse</Button>
      </Card.Body>
    </Card>
   )
}

export default CardComp
