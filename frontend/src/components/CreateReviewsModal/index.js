import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewReviewTK } from '../../store/reviews';
import { useModal } from '../../context/Modal'
const CreateReviewsModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [url, setUrl] = useState('');
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (currentUser) setErrors([]);
    else setErrors(['Log in to leave a review']);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setHasSubmitted(true);

    const errorsArr = [];
    if (!review.length || review.length > 150)
      errorsArr.push('Enter a valid review fewer than 150 characters long');

    setErrors(errorsArr);
    if (errorsArr.length) return;
    const reviewInfo = { review, stars, url };

    const newReview = await dispatch(
      createNewReviewTK(reviewInfo, spotId, currentUser)
    ).catch(async (res) => {
      const message = await res.json();
      const messageErrors = [];

      if (message) {
        messageErrors.push(message.error);
        errorsArr.push(message.error);
        setErrors(messageErrors);
      }
    });
    if (newReview && !url.length) {
      closeModal();
    }

    history.push(`/spots/${spotId}`);
  };

  return (
    <div>
      <div>Leave a Review</div>

      <div>
        {hasSubmitted &&
          errors &&
          errors.map((error) => <div key={error}>{error}</div>)}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Rating:&nbsp;
            <select
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option>{num}</option>
              ))}
            </select>
          </label>
          <div></div>
          <label>
            Review:
            <textarea
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <div className=""></div>
        </div>

        <button>Create Review</button>


      </form>
    </div>
  );
};

export default CreateReviewsModal;
