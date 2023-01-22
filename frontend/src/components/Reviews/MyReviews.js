import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeReviewTK } from '../../store/reviews';

const MyReviews = ({ review }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteReviewHandleClick = async () => {
    await dispatch(removeReviewTK(review.id));
  };

  return (
    <>
      <div className="review-wrapper">
        <div className="review-header">
          Review For{' '}
          <Link
            style={{ textDecoration: 'none' }}
            to={`/spots/${review.Spot.id}`}
          >
            {review.Spot.name}
          </Link>
          {''}:
        </div>

        <div>
          <p className="review-date">
            {new Date(review.createdAt).toString().slice(3, -42)}
          </p>
          <div>
            {[...Array(review.stars)].map((star) => (
              <i className="fa-solid fa-star"></i>
            ))}
          </div>

          <div className="user-review-text">
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
            <span> </span>
            <span>{review.review}</span>
            <span> </span>
            <i className="fa fa-light fa-fire" aria-hidden="true"></i>
          </div>
        </div>

        <div>
          <button
            className="review-delete-button"
            onClick={deleteReviewHandleClick}
          >
            Delete Review
          </button>
        </div>
        <div className="breaker"></div>
        <div>
          {review.ReviewImages.length > 0 && (
            <div>
              <p>Image For This Spot :</p>
              <div>
                {review.ReviewImages.map((ele) => {
                  return (
                    <div>
                      <img src={ele.url} />
                    </div>
                  );
                })}
              </div>
              {/* <div className="breaker"></div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReviews;
