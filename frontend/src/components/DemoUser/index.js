import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './DemoUser.css';

const DemoUser = () => {
  const dispatch = useDispatch();
  const DemoUserLogin = () => {
    return dispatch(
      login({
        credential: 'Demo_User',
        password: 'password',
      })
    );
  };

  return (
    <div className="menu-button-demo">
      <button id="demouser" onClick={DemoUserLogin}>
        Demo User
      </button>
    </div>
  );
};

export default DemoUser;
