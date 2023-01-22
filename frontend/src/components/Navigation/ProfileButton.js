import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from 'react-router-dom';
import DemoUser from '../DemoUser';
function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <div className="wrapperr">
      <button className="profileButton pfbutton" onClick={openMenu}>
        <div className='user-icon'>

        <i className="fas fa-light fa-bars"></i>
        <i className="fas fa-user-circle" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="namewrap">
              <div className="userStyle">{user.username}</div>
              <div className="userStyle">
                {user.firstName} {user.lastName}
              </div>
              <div className="userStyle">{user.email}</div>
              <div className="userStyle-line"></div>
            </div>
            <div>
              <NavLink exact to="/myreviews">
                <div className="menu-button">
                  <button>My Reviews</button>
                </div>
              </NavLink>
            </div>
            <NavLink exact to="/my-spots">
              <div className="menu-button">
                <button>My Spots</button>
              </div>
            </NavLink>
            <div className="menu-button">
              <button id="demouser" style={{ color: 'red' }} onClick={logout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="menu-button">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="menu-button">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div>
              <DemoUser />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
