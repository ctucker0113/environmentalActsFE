import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import deleteEvent from '../api/eventData';
import { useAuth } from '../utils/context/authContext';
// import { useEffect } from 'react';

export default function EventCards({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Would you like to delete ${eventObj.title}?`)) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  console.warn(onUpdate);

  const { user } = useAuth();

  // useEffect(() => {
  //   ();
  // }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{eventObj.title}</Card.Title>
        <p>Scheduled date: {eventObj.scheduledDate}</p>
        <p className="card-text bold">{eventObj.description}</p>
        <p>{eventObj.category.name}</p>
        <Link href={`/EventDetails/${eventObj.id}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        {eventObj.uid === user.uid && (
          <>
            <Link href={`/event/editEvent/${eventObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisEvent} className="m-2">
              DELETE
            </Button>
          </>
        )}
        {eventObj.uid !== user.uid && (
          <Button variant="info" onClick={deleteThisEvent} className="m-2">
            Sign Up
          </Button>
        )}
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
