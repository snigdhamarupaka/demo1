import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './UsersList.css';
import API_URL from '../config';

const UsersList = forwardRef((props, ref) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Expose fetchUsers to parent component
  useImperativeHandle(ref, () => ({
    refreshUsers: fetchUsers
  }));

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the list after deletion
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="users-list-container">
      <div className="users-list-card">
        <div className="list-header">
          <h2>Registered Users</h2>
          <button onClick={fetchUsers} className="refresh-btn" disabled={loading}>
            {loading ? '↻ Loading...' : '↻ Refresh'}
          </button>
        </div>

        {error && (
          <div className="error-box">
            ✕ {error}
          </div>
        )}

        {loading && !error ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <p>No users registered yet.</p>
            <p className="empty-subtitle">Submit the form above to add your first user!</p>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Registered At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.created_at)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="delete-btn"
                        title="Delete user"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="users-count">
              Total: {users.length} {users.length === 1 ? 'user' : 'users'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default UsersList;
