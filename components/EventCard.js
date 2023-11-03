import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent } from '../api/eventData';

export default function EventCards({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Would you like to delete ${eventObj.title}?`)) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };
  console.warn(eventObj);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{eventObj.title}</Card.Title>
        <p className="card-text bold">{eventObj.description}</p>
        <p>{eventObj.category.name}</p>
        <Link href={`/EventDetails/${eventObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCards.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    scheduledDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
