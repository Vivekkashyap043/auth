import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';

const ActionHandler = () => {
  const location = useLocation();
  const [actionMode, setActionMode] = useState(null);

  useEffect(() => {
    // Extract mode from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    setActionMode(mode);
  }, [location]);

  // Conditionally render the component based on the action mode
  if (actionMode === 'resetPassword') {
    return <ResetPassword />;
  } else if (actionMode === 'verifyEmail') {
    return <VerifyEmail />;
  } else {
    return <div>Invalid or missing action mode</div>;
  }
};

export default ActionHandler;
