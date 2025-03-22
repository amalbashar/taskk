import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; 
import ReusableButton from '../components/reuseable/Button'; 
import '../styles/Login.css'; 

const UserDashboard = () => {
    const userId = localStorage.getItem('user_id');

    const [events, setEvents] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('auth_token');
                const response = await axios.get('http://localhost:8000/api/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents([]);
                }
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Fetch interested events
    useEffect(() => {
        const fetchInterestedEvents = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await axios.get(`http://localhost:8000/api/user/${userId}/interested-events`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInterestedEvents(response.data);
            } catch (err) {
                console.error('Failed to fetch interested events', err);
            }
        };
        fetchInterestedEvents();
    }, []);
                                          // الapiشغال 
                          // وبجيب ريسبونس بس مش عارف ليه هاد برجع اريز فاضيين  

    const handleInterest = async (eventId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post(
                `http://localhost:8000/api/events/${eventId}/interest`,
                { user_id: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInterestedEvents([...interestedEvents, response.data]);
            setEvents(events.filter(event => event.id !== eventId));
            setSuccessMessage('You have expressed interest in this event!');
        } catch (err) {
            console.error("Failed to express interest", err);
            setErrorMessage('Failed to express interest');
        }
    };

    const handleUninterest = async (eventId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post(
                `http://localhost:8000/api/events/${eventId}/uninterest`,
                { user_id: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInterestedEvents(interestedEvents.filter(event => event.id !== eventId));
            setEvents([...events, response.data]);
            setSuccessMessage('You have removed interest in this event!');
        } catch (err) {
            console.error("Failed to remove interest", err);
            setErrorMessage('Failed to remove interest');
        }
    };
                                         // بعرفش اذا شغال ما عملتو لسا



  

    return (
        <Layout title="User Dashboard">
                                      <br />  <br />  <br />  <br />  <br />  <br /> <br /> 

            <div className="dashboard-container">
               



                <div className="events-section">
                    <h3>Available Events</h3>
                    {loading ? (
                        <p>Loading events...</p>
                    ) : (
                        <ul>
                            {events.length > 0 ? (
                                events.map(event => (
                                    <li key={event.id}>
                                        <h4>{event.title}</h4>
                                        <p>{event.description}</p>
                                        <p>Location: {event.location}</p>
                                        <p>Date: {new Date(event.event_date).toLocaleString()}</p>
                                        <ReusableButton
                                            text="Express Interest"
                                            onClick={() => handleInterest(event.id)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <p>No available events</p>
                            )}
                        </ul>
                    )}
                </div>

                <div className="events-section">
                    <h3>Your Interested Events</h3>
                    <ul>
                        {interestedEvents.length > 0 ? (
                            interestedEvents.map(event => (
                                <li key={event.id}>
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Date: {new Date(event.event_date).toLocaleString()}</p>
                                    <ReusableButton
                                        text="Remove Interest"
                                        onClick={() => handleUninterest(event.id)}
                                    />
                                </li>
                            ))
                        ) : (
                            <p>You have no interested events</p>
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
