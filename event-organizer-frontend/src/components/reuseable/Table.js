import React, { useState } from 'react';
import '../../styles/Table.css';

const Table = ({ columns, data, onSave, onDelete }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (id, rowData) => {
    setEditingRow(id);
    setEditedData({ ...rowData });
  };

  const handleChange = (e, column) => {
    setEditedData({ ...editedData, [column]: e.target.value });
  };

  const handleSave = (id) => {
    onSave(id, editedData);
    setEditingRow(null);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col}>
                  {editingRow === item.id ? (
                    <input
                      type="text"
                      value={editedData[col] || ''}
                      onChange={(e) => handleChange(e, col)}
                    />
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
              <td>
                {editingRow === item.id ? (
                  <>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => setEditingRow(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item.id, item)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
