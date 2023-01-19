import { csrfFetch } from './csrf';

// ACTIONS
const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS';
const LOAD_SINGLESPOT = 'spots/LOAD_SINGLESPOT';
const CREATE_SINGLESPOT = 'spots/CREATE_SINGLESPOT';
const ADDIMAGE = 'spots/ADDIMAGE';
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
const CreateSpot = (spot) => {
  return {
    type: CREATE_SINGLESPOT,
    spot,
  };
};
const Createimg = (img) => {
  return {
    type: ADDIMAGE,
  img,
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
export const createSingleSpotTK = (data, imgData) => async (dispatch) => {
  // let { address, city, state, country, lat, lng, name, description, price } = data
  try {
    const response = await csrfFetch(`/api/spots`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newSpot = await response.json();
    dispatch(CreateSpot(newSpot));

    const { url, preview } = imgData;
    const imgRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, preview }),
    });

    const img = await imgRes.json();
    dispatch(Createimg(img));

    newSpot['SpotImages'] = [img];

    return newSpot;
  } catch (error) {
    throw error;
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
    case CREATE_SINGLESPOT:
      return {
        singleSpot: null,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot,
        },
      };
    case ADDIMAGE:
      return {
        ...state,
        singleSpot: { ...state.singleSpot, SpotImages: [action.img] },
      };
    default:
      return state;
  }
};

export default spotsReducer;
