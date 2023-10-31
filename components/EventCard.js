import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../api/eventData';

export default function EventCards({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Would you like to delete ${eventObj.title}?`)) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{eventObj.title}</Card.Title>
        <p className="card-text bold">{eventObj.description}</p>
        <Button variant="primary" className="m-2">VIEW</Button>

        <Button variant="info">EDIT</Button>

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
    categoryId: PropTypes.string,
    id: PropTypes.string,
    scheduledDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
// EventCards.defaultProps = {
//   eventObj: {},
//   onUpdate: {},
// }
