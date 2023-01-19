import { csrfFetch } from './csrf';

// ACTIONS
const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS';
const LOAD_SINGLESPOT = 'spots/LOAD_SINGLESPOT';
//ACTION CREATOR

const LoadAllSpots = (spots) => {
  return {
    type: LOAD_ALLSPOTS,
    spots,
  };
};
const LoadSingleSpot = (spot) => {
  return {
    type: LOAD_SINGLESPOT,
    spot,
  };
};

//THUNKS

export const getAllSpotsTK = () => async (dispatch) => {
  const res = await csrfFetch('api/spots');
  if (res.ok) {
    const spots = await res.json();

    dispatch(LoadAllSpots(spots));
  }
};
export const getSingleSpotTK = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();

    dispatch(LoadSingleSpot(spot));
  }
};
const initialState = {
  allSpots: {},
  singleSpot: {},
};


const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {

    case LOAD_ALLSPOTS:
      newState = { ...state };
      const normalizedSpots = {};
      // action.spots --> {Spots: [{x}]}
      action.spots.Spots.forEach((spot) => (normalizedSpots[spot.id] = spot));
      newState.allSpots = normalizedSpots;
      newState.singleSpot = {};
      return newState;

    case LOAD_SINGLESPOT:
      newState = { ...state };
      newState.singleSpot = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
