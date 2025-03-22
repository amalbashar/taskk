import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/reuseable/Table';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editingRoleId, setEditingRoleId] = useState(null); 
  const [editedRoleName, setEditedRoleName] = useState(''); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/roles')
      .then(response => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id, name) => {
    setEditingRoleId(id);
    setEditedRoleName(name);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8000/api/admin/roles/${editingRoleId}`, { name: editedRoleName })
      .then(() => {
        setRoles(roles.map(role =>
          role.id === editingRoleId ? { ...role, name: editedRoleName } : role
        ));
        setEditingRoleId(null);
        alert('Role updated successfully');
      })
      .catch(() => {
        setError('Failed to update role');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/admin/roles/${id}`)
      .then(() => {
        setRoles(roles.filter(role => role.id !== id));
        alert('Role deleted successfully');
      })
      .catch(() => {
        setError('Failed to delete role');
      });
  };

  return (
    <div>
      <h2>Role Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Table 
        columns={['name']} 
        data={roles} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        editingCategoryId={editingRoleId} 
        editedCategoryName={editedRoleName} 
        setEditedCategoryName={setEditedRoleName} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default RoleManagement;
