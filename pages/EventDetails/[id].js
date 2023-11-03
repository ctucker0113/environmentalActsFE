/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../api/eventData';

export default function ViewEventDetails() {
  const [eventDetails, setEventDetails] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  const getAEventDetails = () => {
    getSingleEvent(id).then(setEventDetails);
  };

  console.warn(eventDetails);

  useEffect(() => {
    getAEventDetails();
  }, []);

  return (
    <>
      {eventDetails.map((events) => (
        <div key={events.id} className="viewTxt">
          <h5>
            Event name: {events.title}
            <br /> description: {events.description}
          </h5>
          <h5>category: {events.category.name}</h5>
          <h5>Date: {events.scheduledDate}</h5>
        </div>
      ))}

    </>
  );
}
