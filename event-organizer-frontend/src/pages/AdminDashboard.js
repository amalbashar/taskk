import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; 
import ReusableButton from '../components/reuseable/Button'; 
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import RoleManagement from './RoleManagement';
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import EventManagement from './EventManagement';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('auth_token');
                const response = await axios.get('http://localhost:8000/api/admin/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch admin data');
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

  
    return (
        <Layout title="Admin Dashboard">
                                                <br />  <br />  <br />  <br />  <br />  <br /> <br /> 

            <div className="admin-dashboard">
                <Sidebar />
                <div className="content">
                    <div className="main-content">
                        
                        <Routes>
                            <Route path="roles" element={<RoleManagement />} />
                            <Route path="users" element={<UserManagement />} />
                            <Route path="categories" element={<CategoryManagement />} />
                            <Route path="events" element={<EventManagement />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
