import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Handle logout logic here
      console.log('User confirmed logout');
     
    } else {
      console.log('User cancelled logout');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
