/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllCreatedEventsOnUser, getAllSignedUpEventsOnUser } from '../api/userData';
import EventCard from '../components/cards/EventCard';

export default function MyEvents() {
  const { user } = useAuth();
  const [signedEvents, setSignedEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  // console.warn(user);
  // console.warn(signedEvents, 'sign');
  // console.warn(createdEvents, 'create');

  const update = () => {
    getAllCreatedEventsOnUser(user.uid).then(setCreatedEvents);
    getAllSignedUpEventsOnUser(user.uid).then(setSignedEvents);
  };

  useEffect(() => {
    getAllCreatedEventsOnUser(user.uid).then(setCreatedEvents);
    getAllSignedUpEventsOnUser(user.uid).then(setSignedEvents);
  }, []);
  return (
    <>
      <div>Events you have signed up for</div>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {signedEvents.map((event) => (
            <EventCard key={event.id} eventObj={event} onUpdate={update} />
          ))}
        </div>
      </div>
      <div>Events you are hosting</div>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {createdEvents.map((event) => (
            <EventCard key={event.id} eventObj={event} onUpdate={update} />
          ))}
        </div>
      </div>
    </>
  );
}
