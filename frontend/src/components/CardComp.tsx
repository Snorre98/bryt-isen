import { Button, Card } from 'react-bootstrap'
import ActivityDetails from '~/pages/ActivityDetails'

type DetailsCardProps = {
  title: string;
  img: string;
  description: string;
  rules: string;
};

function CardComp({title, img, description, rules}: DetailsCardProps) {
   return(
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <ActivityDetails title={title} img={img} description={description} rules={rules} />
      </Card.Body>
    </Card>
   )
};

export default CardComp
