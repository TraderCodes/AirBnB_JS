import { csrfFetch } from './csrf';

// ACTIONS
const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS';
const LOAD_SINGLESPOT = 'spots/LOAD_SINGLESPOT';
const CREATE_SINGLESPOT = 'spots/CREATE_SINGLESPOT';
const ADDIMAGE = 'spots/ADDIMAGE';
const UPDATE_SINGLESPOT = 'spots/UPDATE_SINGLESPOT';
const DELETE_SINGLESPOT = 'spots/UPDATE_SINGLESPOT';
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
const UpdateSpot = (spot) => {
  return {
    type: UPDATE_SINGLESPOT,
    payload: spot,
  };
};

const Deletespot = (spotId) => {
  return {
    type: DELETE_SINGLESPOT,
    payload: spotId,
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
export const deleteSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });
  if (response.ok) dispatch(Deletespot(spotId));
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

    case ADDIMAGE:
      return {
        ...state,
        singleSpot: { ...state.singleSpot, SpotImages: [action.img] },
      };
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
    case UPDATE_SINGLESPOT:
      newState = { ...state };
      newState.singleSpot[action.payload.id] = { ...action.payload };
      newState.singleSpot = action.payload;
 
      return newState;

    case DELETE_SINGLESPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      delete newState.singleSpot;
      delete newState.allSpots[action.payload];

      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
