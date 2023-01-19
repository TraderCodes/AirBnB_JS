import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LoadAllSpots from './components/Spots/LoadAllSpots';
import LoadSingleSpot from './components/Spots/LoadSingleSpot';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LoadAllSpots exact path="/" />
          </Route>

          <Route path="/spots/:spotId">
            <LoadSingleSpot />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
