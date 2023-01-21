import MyReviews from './MyReviews';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviewsTK } from '../../store/reviews';

const UserReviews = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews.user);
  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(getUserReviewsTK());
  }, [dispatch, reviewsObj]);

  if (!currentUser) return <Redirect to="/" />;

  return (
    <>
      <div >
        {reviewsArr.length === 0 ? (
          <>
            <h1>Reviews</h1>
            <h4>No Reviews!</h4>
          </>
        ) : (
          <h1>My Reviews</h1>
        )}
      </div>

      <div >
        <div >
          {
            <div >
              <div >
                {reviewsArr.map((review) => (
                  console.log(review),

                  <MyReviews key={review.id} review={review}

                  />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default UserReviews;
