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
    <div>
      <div>
        Review For{' '}
        <Link
          style={{ textDecoration: 'none' }}
          to={`/spots/${review.Spot.id}`}
        >
          {review.Spot.name}
        </Link>
        :
      </div>

      <div>
        <p>{new Date(review.createdAt).toString().slice(3, -42)}</p>
        <div>
          {[...Array(review.stars)].map((star) => (
            <i className="fa-solid fa-star"></i>
          ))}
        </div>

        <div>
          <i className="fa fa-quote-left fa-lg" aria-hidden="true"></i>
          <span> </span>
          <span>{review.review}</span>
          <span> </span>
          <i className="fa fa-quote-right fa-lg" aria-hidden="true"></i>
        </div>
      </div>

      <div>
        <button onClick={deleteReviewHandleClick}>Delete Review</button>
      </div>

      <div>
        {review.ReviewImages.length > 0 && (
          <div>
            <p>Image For This Spot:</p>
            <div>
              {review.ReviewImages.map((ele) => {
                return (
                  <div>
                    <img src={ele.url} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
