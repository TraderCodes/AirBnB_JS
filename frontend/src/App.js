import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);
  return (
    <>
      <Switch>
        {/* <Route path='/'>
          <h2>/login to log in </h2>
        </Route> */}
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
