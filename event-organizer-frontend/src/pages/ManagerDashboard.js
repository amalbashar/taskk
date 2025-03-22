import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import InputField from '../components/reuseable/InputField';  
import ReusableButton from '../components/reuseable/Button'; 
import '../styles/Login.css'; 

const ManagerDashboard = () => {
    const userId = localStorage.getItem('user_id');
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        event_date: '',
        category_id: '',
        created_by: userId
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const eventResponse = await axios.get('http://localhost:8000/api/user/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(eventResponse.data.events);

                const userResponse = await axios.get('http://localhost:8000/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(userResponse.data);

                const categoryResponse = await axios.get('http://localhost:8000/api/categories', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(categoryResponse.data);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

   
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };

    const handleEdit = (event) => {
        setEditingEvent({
            id: event.id,  
            title: event.title || '',
            description: event.description || '',
            event_date: event.event_date ? event.event_date.split('T')[0] : '', 
            category_id: event.category_id || ''
        });
    };
    
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditingEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth_token');
            await axios.put(`http://localhost:8000/api/events/${editingEvent.id}`, editingEvent, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
            setEditingEvent(null);
            setSuccessMessage('Event updated successfully');
        } catch (error) {
            setErrorMessage('Failed to update event');
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('auth_token');
        const eventData = {
            title: newEvent.title,
            description: newEvent.description,
            event_date: newEvent.event_date,
            category_id: selectedCategory,
            created_by: userId
        };

        axios.post('http://localhost:8000/api/events', eventData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setEvents([...events, response.data.event]);
            setSuccessMessage('Event added successfully');
            setErrorMessage('');

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            setSelectedCategory('');
        })
        .catch(error => {
            setSuccessMessage('');
            setErrorMessage('Failed to add event');
            setNewEvent({ 
                title: '', 
                description: '', 
                event_date: '', 
                category_id: '', 
                created_by: userId 
            });
        });
    };

    return (
        <Layout title="Dashboard">
            <div className="dashboard-container">
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div>
                    <h3>Your Events</h3>
                    <ul>
                        {events?.length > 0 ? (
                            events.map(event => (
                                <li key={event.id}>
                                    {editingEvent && editingEvent.id === event.id ? (
                                        <form onSubmit={handleUpdateSubmit}>
                                            <InputField name="title" value={editingEvent.title} onChange={handleUpdateChange} required />
                                            <InputField name="event_date" type="date" value={editingEvent.event_date} onChange={handleUpdateChange} required />
                                            <InputField name="description" value={editingEvent.description} onChange={handleUpdateChange} required />
                                            <div>
                                                <label>Category</label>
                                                <select 
                                                    value={selectedCategory} 
                                                    onChange={handleCategoryChange} 
                                                    required
                                                >
                                                    <option value="">Select a category</option>
                                                    {categories?.length > 0 ? (
                                                        categories.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="">No categories available</option>
                                                    )}
                                                </select>
                                            </div>
                                            <ReusableButton type="submit" text="Save" />
                                            <ReusableButton type="button" text="Cancel" onClick={() => setEditingEvent(null)} />
                                        </form>
                                    ) : (
                                        <>
                                            <h4>{event.title}</h4>
                                            <p>{event.description}</p>
                                            <p>{new Date(event.event_date).toLocaleString()}</p>
                                            <ReusableButton text="Edit" onClick={() => handleEdit(event)} />
                                        </>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>Loading events...</p>
                        )}
                    </ul>
                </div>

                <div className="login-container">
                    <div className="login-box" style={{ width: '40%' }}>
                        <h3>Add New Event</h3>
                        <form onSubmit={handleSubmit}>
                            <InputField 
                                placeholder="Title"
                                name="title" 
                                value={newEvent.title} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <InputField 
                                label="Event Date" 
                                placeholder="Event Date"
                                name="event_date" 
                                value={newEvent.event_date} 
                                onChange={handleInputChange} 
                                type="date" 
                                required 
                            />
                            <InputField 
                                name="description"
                                placeholder="Description"
                                value={newEvent.description} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <div>
                                <label>Category</label>
                                <select 
                                    value={selectedCategory} 
                                    onChange={handleCategoryChange} 
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories?.length > 0 ? (
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No categories available</option>
                                    )}
                                </select>
                            </div>

                            <ReusableButton 
                                type="submit" 
                                className="submit-btn" 
                                text="Add Event" 
                            />
                        </form>
                    </div>
                </div>

             
            </div>
        </Layout>
    );
};

export default ManagerDashboard;
