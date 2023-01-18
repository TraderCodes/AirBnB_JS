import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsTK } from '../../store/spots';
import Spot from './Spot';
function LoadAllSpots() {
  const dispatch = useDispatch();
  // use useSelect to get the state
  const spotsObj = useSelector((state) => {
    // console.log('state',state.spots)
    return state.spots.allSpots;
  });
  const spotsArr = Object.values(spotsObj);
  console.log(spotsArr);

  useEffect(() => {
    dispatch(getAllSpotsTK());
    // return () => {
    // dispatch(acResetSpots());
    // };
  }, [dispatch]);
  if (!spotsArr.length) return null;
  return (
    <>
      <div className="wrapper-center">
        <div className="allspots-container">
          {spotsArr.map((spot) => (
            <Spot key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LoadAllSpots;
