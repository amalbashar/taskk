import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/reuseable/Table'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editingUser, setEditingUser] = useState(null); 
  const [newUserName, setNewUserName] = useState(''); 
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/users')
      .then(response => {
        setUsers(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message); 
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/admin/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserName(user.name); 
    setNewUserEmail(user.email); 
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:8000/api/admin/users/${editingUser.id}`, {
      name: newUserName,
      email: newUserEmail
    })
      .then(response => {
        const updatedUser = response.data;
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null); 
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const columns = ['name', 'email'];

  return (
    <div>
      <h2>User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <input 
            type="text" 
            value={newUserName} 
            onChange={(e) => setNewUserName(e.target.value)} 
            placeholder="Name"
          />
          <input 
            type="email" 
            value={newUserEmail} 
            onChange={(e) => setNewUserEmail(e.target.value)} 
            placeholder="Email"
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      <Table 
        columns={columns} 
        data={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default UserManagement;
