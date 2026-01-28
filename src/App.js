import React, { useRef } from 'react';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import './App.css';

function App() {
  const usersListRef = useRef();

  const handleUserAdded = () => {
    // Refresh the users list when a new user is added
    if (usersListRef.current) {
      usersListRef.current.refreshUsers();
    }
  };

  return (
    <div className="App">
      <UserForm onUserAdded={handleUserAdded} />
      <UsersList ref={usersListRef} />
    </div>
  );
}

export default App;
