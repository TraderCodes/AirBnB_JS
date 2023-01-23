import MyReviews from './MyReviews';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviewsTK } from '../../store/reviews';
import './Reviews.css';
const UserReviews = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews.user);
  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(getUserReviewsTK());
  }, [dispatch]);

  if (!currentUser) return <Redirect to="/" />;

  return (
    <>
      <div className="user-review-header">
        {reviewsArr.length === 0 ? (
          <>
            <h1>Reviews</h1>
            <div className='noreviews'>
              <h3>You got no reviews !  </h3>
            </div>
          </>
        ) : (
          <h1>Your Reviews</h1>
        )}
      </div>

      <div className="wrapper-center">
        <div>
          {
            <div>
              <div className="user-reviews-wrapper">
                {reviewsArr.map(
                  (review) => (
                    // console.log(review),
                    (<MyReviews key={review.id} review={review} />)
                  )
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default UserReviews;
