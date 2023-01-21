import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LoadAllSpots from './components/Spots/LoadAllSpots';
import LoadSingleSpot from './components/Spots/LoadSingleSpot';
import Footer from './components/Footer';
// import LoadUserSpots from './components/UserSpots/LoadUserSpots';
import UserSpots from './components/UserSpots';
import LoadUserReviews from './components/Reviews/UserReviews';
import UserReviews from './components/Reviews/UserReviews';

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
          <Route exact path="/my-spots">
            <UserSpots />
          </Route>
          <Route exact path="/myreviews">
            <UserReviews />
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
