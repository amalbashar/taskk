import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/reuseable/Table';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null); 
  const [editedCategories, setEditedCategories] = useState({}); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (id, value) => {
    setEditedCategories(prev => ({ ...prev, [id]: value }));
  };

  const handleEdit = (id, name) => {
    setEditingCategoryId(id);
    setEditedCategories(prev => ({ ...prev, [id]: name }));
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8000/api/admin/categories/${id}`, { name: editedCategories[id] })
      .then(() => {
        setCategories(categories.map(category =>
          category.id === id ? { ...category, name: editedCategories[id] } : category
        ));
        setEditingCategoryId(null); 
        alert('Category updated successfully');
      })
      .catch(() => {
        setError('Failed to update category');
      });
  };

  // حذف الفئة
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/admin/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
        alert('Category deleted successfully');
      })
      .catch(() => {
        setError('Failed to delete category');
      });
  };

  return (
    <div>
      <h2>Category Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Table
        columns={['name']}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editingCategoryId={editingCategoryId}
        editedCategories={editedCategories}
        onInputChange={handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default CategoryManagement;
