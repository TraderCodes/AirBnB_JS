import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/Fireball.gif';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';
import DemoUser from '../DemoUser';
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

        <div>
          <DemoUser />
        </div>
      {sessionUser && (
        <div>

        <div>
          <OpenModalButton
            buttonText="Create Spot !"
            modalComponent={<CreateSpotModal />}
          />
        </div>
          <div>
        <NavLink exact to="/my-spots">
          <div className="logowrapper">
            <img className="logo"  style={{ height: '80px' }} />
            <span style={{ textDecoration: 'none' }}>MY SPOTS</span>
          </div>
        </NavLink>
      </div>
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
