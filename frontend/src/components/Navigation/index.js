import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/Fireball.gif';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="wrapper">
      <div>
        <NavLink exact to="/">
          <div className="logowrapper">
            <img className="logo" src={logo} style={{ height: '80px' }} />
            <span style={{ textDecoration: 'none' }}>FireBnb</span>
          </div>
        </NavLink>
      </div>
      {sessionUser && (
        <div>
          <OpenModalButton
            buttonText="Create user"
            modalComponent={<CreateSpotModal />}
          />
        </div>
      )}
      {isLoaded && (
        <div className="profile-container">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
