import React, { useEffect } from 'react';
import noImage from '../../images/noimage.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSpotTK } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './Spot.css';
export default function LoadSingleSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => {
    return state.spots.singleSpot;
  });
  useEffect(() => {
    dispatch(getSingleSpotTK(spotId));
  }, [dispatch, spotId]);
  // console.log(spot)

  // if no spot return null
  if (!Object.values(spot).length) return null;

  const spotImgArr = spot?.SpotImages;
  let previewImages;
  let displayImages = [];
  if (spotImgArr) {
    for (let img of spotImgArr) {
      if (img.preview === true) {
        previewImages = img.url;
      } else {
        displayImages.push(img.url);
      }
    }
  }

  if (!spot?.Owner) return null;
  if (!Object.keys(spot).length) return null;
  return (
    <div className="singlespot-container">
      <div>
        <div>
          <h1>{spot.name}</h1>
        </div>

        <div>
          {spot.avgRating ? (
            <span> ★{spot.avgRating} · </span>
          ) : (
            <span> New · </span>
          )}
          <span>{spot.numReviews} reviews · </span>
          <span>Superhost · </span>
          <span>
            {spot.city}, {spot.state}, {spot.country}
          </span>
        </div>
      </div>

      <div id="spot-img-container">
        <img id="preview-img" alt={spot.name} src={previewImages} />
        <div className="other-img-container">
          {displayImages.length > 0 &&
            displayImages.map((url) => (
              <img
                id={`spot-image-${url.id}`}
                className="other-image"
                alt={spot.name}
                src={url}
                key={url}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
