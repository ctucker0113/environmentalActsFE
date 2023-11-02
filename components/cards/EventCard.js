import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEvent } from '../../api/eventData';

export default function EventCard({ eventObj, onUpdate }) {
  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${eventObj.title} and their members`)) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{eventObj.title}</Card.Title>
          <div className="d-grid gap-2">
            <p>Description: {eventObj.description}</p>
            <p>Date: {eventObj.scheduledDate}</p>
            <p>Type of Event: {eventObj.category.name}</p>
            <Link href={`/event/${eventObj.id}`} passHref>
              <Button variant="primary" className="m-2">VIEW</Button>
            </Link>
          </div>
          <div className="d-grid gap-2">
            <Link href={`/event/editEvent/${eventObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
          </div>
          <br />
          <Button variant="danger" onClick={deleteThisOrder} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    scheduledDate: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
