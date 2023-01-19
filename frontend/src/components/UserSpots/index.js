import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsTK, deleteSingleSpot } from '../../store/spots';

const UserSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.allSpots);
  const userId = useSelector((state) => state.session.user.id);
  const spotsArr = Object.values(spots).filter(
    (spot) => spot.ownerId === userId
  );

  useEffect(() => {
    dispatch(getAllSpotsTK());
  }, [dispatch]);

  const deleteSpotClickEvent = async (spotId) => {
    await dispatch(deleteSingleSpot(spotId));
    history.push('/my-spots');
  };

  if (!spots) return null;

  return (
    <>
      <div>
        <h1>Here are all your Spots</h1>
      </div>
      <div>
        {spotsArr.length > 0 ? (
          spotsArr.map((spot) => {
            // console.log(spot.previewImage);
            return (
              <div key={spot.id}>
                <NavLink
                  style={{ textDecoration: 'none' }}
                  to={`/spots/${spot.id}`}
                >
                  <div>
                    <img src={spot.previewImage} alt={spot.id} style={{height:'50px'}} />
                  </div>

                  <div>
                    <div>
                      <span>
                        {spot.city}

                        {spot.state}
                      </span>
                      <div>
                        <i
                          className="fa-sharp fa-solid fa-star"
                          style={{ color: 'black' }}
                        ></i>
                        <span>
                          {spot.avgRating === 'NaN' ? 'New' : spot.avgRating}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div>
                        <span>{`$${spot.price}`}</span>
                        night
                      </div>
                    </div>
                  </div>
                </NavLink>

                <div>
                  <button
                    className="user-button"
                    onClick={() => deleteSpotClickEvent(spot.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>You're not hosting any spots</div>
        )}
      </div>
    </>
  );
};

export default UserSpots;
