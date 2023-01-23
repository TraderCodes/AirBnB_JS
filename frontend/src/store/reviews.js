import { csrfFetch } from './csrf';

const LOAD_SPOTREVIEWS = 'reviews/LOAD_SPOTREVIEWS';
const RESET_REVIEWS = 'reviews/RESET_REVIEWS';
const LOAD_USERREVIEWS = 'reviews/LOAD_USERREVIEWS';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOTREVIEWS,
    reviews,
  };
};
const loadUserReviews = (reviews) => {
  return {
    type: LOAD_USERREVIEWS,
    reviews,
  };
};
export const resetReviews = () => {
  return {
    type: RESET_REVIEWS,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};
const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};
export const getSpotReviewsTK = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    const reviews = data.Reviews; //array [{}, {}]

    dispatch(loadSpotReviews(reviews));
    return data;
  }
  // return null
};
export const getUserReviewsTK = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current');
  if (res.ok) {
    const data = await res.json();
    const reviews = data.Reviews; //array [{}, {}]
    dispatch(loadUserReviews(reviews));
    return data;
  }
};
export const removeReviewTK = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

export const createNewReviewTK =
  (newReview, spotId, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    });

    if (!res.ok) {
      let error;
      if (res.status === 403) {
        error = await res.json();
        return error.message;

      }
      console.log(error)
    }

    if (res.ok) {
      const newReview = await res.json();
      const userInfo = {};
      userInfo.id = user.id;
      userInfo.firstName = user.firstName;
      userInfo.lastName = user.lastName;
      newReview.User = userInfo;
      newReview.ReviewImages = [];

      dispatch(createReview(newReview));

      return newReview;
    } else {
      const result = await res.json();
      return result;
    }
  };

const initialState = {
  spot: {},
  user: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTREVIEWS:
      newState = { ...state };
      const normalizedReview = {};
      action.reviews.forEach((review) => {
        normalizedReview[review.id] = review;
      });
      newState.spot = normalizedReview;
      newState.user = {};
      return newState;
    case LOAD_USERREVIEWS:
      newState = { ...state };
      const normalizedUserReviews = {};
      //payload = reviews = [{}, {}]
      action.reviews.forEach(
        (review) => (normalizedUserReviews[review.id] = review)
      );
      newState.user = normalizedUserReviews;
      newState.spot = {};
      return newState;
    case CREATE_REVIEW:
      newState = { ...state };
      newState.user = { ...state.user };
      newState.spot = { ...state.spot, [action.review.id]: action.review };
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      newState.spot = { ...state.spot };
      newState.user = { ...state.user };
      delete newState.spot[action.reviewId];
      delete newState.user[action.reviewId];
      return newState;

    case RESET_REVIEWS:
      newState = { ...state };
      newState.user = {};
      newState.spot = {};
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
