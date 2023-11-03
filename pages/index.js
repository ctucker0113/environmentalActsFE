import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/eventData';
import EventCards from '../components/EventCard';
import { useAuth } from '../utils/context/authContext';

export default function AllEvents() {
  const [Event, setEvent] = useState([]);

  const { user } = useAuth();

  const getAllTheEvents = () => {
    getEvents().then(setEvent);
  };

  useEffect(() => {
    getAllTheEvents();
  }, []);
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '20vh',
          padding: '30px',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >

        <h1>Hello {user.fbUser.displayName}! </h1>
        <h2>Welcome to *website name*!</h2>
        <p>This website is for scheduleing and applying for events online</p>
      </div>
      <div className="text-center my-4">
        <h1>All Events</h1>

        <div className="d-flex flex-wrap">
          {Event.map((event) => (
            <EventCards key={event.Id} eventObj={event} onUpdate={getAllTheEvents} />
          ))}
        </div>
      </div>
    </>
  );
}
