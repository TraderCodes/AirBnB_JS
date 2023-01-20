import { csrfFetch } from './csrf';

const LOAD_SPOTREVIEWS = 'reviews/LOAD_SPOTREVIEWS';
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
