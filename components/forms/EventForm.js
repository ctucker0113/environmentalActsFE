/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import getCategories from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { updateEvent, createEvent } from '../../api/eventData';

const initialState = {
  title: '',
  description: '',
  eventDate: '',
};

export default function EventForm({ eventObj }) {
  // Sets the initial values for the form
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  // Fetches data to enable access to user and routing information
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If the object already exists (i.e. - has an ID), then fill the form with the values from the object.
    // Else, leave the values in the form blank.
    getCategories().then(setCategories);
    if (eventObj.id) setFormInput(eventObj);
  }, [eventObj]);

  console.warn(categories);
  const handleChange = (e) => {
    e.preventDefault();
    // Declares 2 variables, 'name,' and 'value' to organize what a user has entered in order to place it in an object.
    const { name, value } = e.target;
    // "Refreshes" the page with an ampty variable called prevState
    setFormInput((prevState) => ({
      // "Spreads" the prevState so that new values can be added to it.
      ...prevState,
      // Combines [name]: value with prevState, either adding the values or updating them depending on the state of the form (update or create)
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the item already exists in the database...
    if (eventObj.id) {
      // Make the Update API call and then route the user to the Heroes page.
      // TO-DO: Create the route for the router.push below and add it into the parentheses.
      updateEvent(formInput).then(() => router.push('/'));
      // Else start running the Add Author function
    } else {
      const payload = { ...formInput, uid: user.uid };
      console.warn(payload, 'this one');
      createEvent(payload).then(() => {
        router.push('/');
      });
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (eventObj.id) {
  //     updateEvent(formInput).then(() => {
  //       console.warn('Event Updated'); // To check if the event update is successful
  //       router.push('/');
  //     }).catch((error) => console.error('Update Event Error:', error));
  //   } else {
  //     console.log('New event detected!');
  //     const payload = { ...formInput, uid: user.uid };
  //     console.log(`The payload contains: ${payload}`);
  //     createEvent(payload).then(({ name }) => {
  //       console.warn('Event Created'); // To check if the event creation is successful
  //       const patchPayload = { id: name };
  //       updateEvent(patchPayload).then(() => {
  //         router.push('/');
  //       }).catch((error) => console.error('Patch Event Error:', error));
  //     }).catch((error) => console.error('Create Event Error:', error));
  //   }
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">Create Event</h2>

      {/* TITLE OF EVENT INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EVENT DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="event Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EVENT DATE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Event Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Date of Event"
          name="eventDate"
          value={formInput.eventDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={eventObj.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">Create Event </Button>
    </Form>
  );
}

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    scheduledDate: PropTypes.string,
    id: PropTypes.string,
    categoryId: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};
