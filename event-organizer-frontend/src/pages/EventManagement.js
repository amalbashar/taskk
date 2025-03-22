import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/reuseable/Table'; 

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/events')
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch events');
        setLoading(false);
      });
  }, []);

  const handleEdit = (event) => {
    setEditingEvent({ ...event }); 
  };

  const handleSave = () => {
    axios.put(`http://localhost:8000/api/admin/events/${editingEvent.id}`, editingEvent)
      .then((response) => {
        setEvents(events.map((event) => (event.id === editingEvent.id ? editingEvent : event)));
        setEditingEvent(null); 
        alert('Event updated successfully');
      })
      .catch((error) => {
        setError('Failed to update event');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/admin/events/${id}`)
      .then((response) => {
        setEvents(events.filter((event) => event.id !== id));
        alert('Event deleted successfully');
      })
      .catch((error) => {
        setError('Failed to delete event');
      });
  };

  return (
    <div className="event-management">
      <h2>Event Management</h2>

      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <Table
          columns={['title', 'event_date', 'description']}
          data={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingEvent={editingEvent} 
          setEditingEvent={setEditingEvent} 
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EventManagement;
