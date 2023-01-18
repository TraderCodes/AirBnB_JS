import { csrfFetch } from './csrf';

// ACTIONS
const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS';

//ACTION CREATOR

const LoadAllSpots = (spots) => {
  return {
    type: LOAD_ALLSPOTS,
    spots,
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
    default:
      return state;
  }
};

export default spotsReducer;
