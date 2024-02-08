import { Button, Card } from 'react-bootstrap'
import img from '../assets/chess-drinking.jpg'
import ActivityDetails from '~/pages/ActivityDetails'

function CardComp() {
   return(
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Drikkelek</Card.Title>
        <Card.Text>
          Beskrivelse av denne drikkeleken.
        </Card.Text>
        <ActivityDetails title={'testTittel'} img={img} description={''} rules={''} />
      </Card.Body>
    </Card>
   )
}

export default CardComp
