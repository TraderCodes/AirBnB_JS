import { csrfFetch } from './csrf';

// ACTIONS
const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS';
const LOAD_ONESPOT = 'spots/LOAD_ONESPOT';
//ACTION CREATOR

const LoadAllSpots = (spots) => {
  return {
    type: LOAD_ALLSPOTS,
    spots,
  };
};
const LoadSingleSpot = (spot) => {
  return {
    type: LOAD_ALLSPOTS,
    spot,
  };
};

//THUNKS

export const getAllSpotsTK = () => async (dispatch) => {
  const res = await csrfFetch('api/spots');
  if (res.ok) {
    const spots = await res.json();
    console.log(spots);
    dispatch(LoadAllSpots(spots));
  }
};
export const getOneSpotTK = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getOneSpotTK(spot));
  }
};
const initialState = {
  allSpots: {},
  singleSpot: {},
};
// spots: {
//   allSpots: {
//     [spotId]: { id, ownerId, address, city, state, country
//                 lat, lng, name, description, price,
//                 avgRating,
//                 previewImage }
//   },
//   singleSpot: { id, ownerId, address, city, state, country
//                 lat, lng, name, description, price,
//                 numReviews,
//                 avgRating,
//                 SpotImages: [ { id, url, preview }, {}, {} ],
//                 Owner: { id, firstName, lastName }
//   }
// }

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

    case LOAD_ONESPOT:
      newState = { ...state };
      newState.singleSpot = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
