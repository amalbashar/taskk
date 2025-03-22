import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Dashboard</h3>
      <ul>
        <li><Link to="/admin-dashboard/roles">Manage Roles</Link></li>
        <li><Link to="/admin-dashboard/users">Manage Users</Link></li>
        <li><Link to="/admin-dashboard/categories">Manage Categories</Link></li>
        <li><Link to="/admin-dashboard/events">Manage Events</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
