import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../api/eventData';

export default function ViewEventDetails() {
  const [eventDetails, setEventDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { id } = router.query;

  const getAEventDetails = () => {
    getSingleEvent(id).then(setEventDetails);
  };

  useEffect(() => {
    getAEventDetails();
  });

  return (
    <>
      <div className="viewTxt">
        <h5>
          Event name: {eventDetails.title}
          <br /> description: {eventDetails.description}
        </h5>
        <h5>category: {eventDetails.category}</h5>
        <h5>Date: {eventDetails.scheduledDate}</h5>
      </div>
    </>
  );
}
