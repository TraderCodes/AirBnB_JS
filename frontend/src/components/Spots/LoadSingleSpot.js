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

  let displayImages = [...spot.SpotImages];
  let previewImages = displayImages.find((img) => {
    return img.preview == true;
  });
  if (!previewImages) {
    previewImages = displayImages[0];
    displayImages.splice(0, 1);
  } else {
    displayImages.splice(displayImages.indexOf(previewImages), 1);
  }
  // console.log(previewImages);
  // console.log(displayImages);
  let restImage = displayImages.length;
  if (restImage < 4) {
    for (let i = 3; i >= restImage; i--) {
      displayImages[i] = { url: noImage };
    }
  }
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
      <div className="singlespot-img-container">
        <div>
          {previewImages && (
            <img
              className="singlespot-preivewimg"
              src={previewImages.url}
              alt={spot.name}
            />
          )}
        </div>
        <div className="singlespot-img2-container">
          {displayImages.length ? (
            displayImages.map((image) => (
              <img
                className="singlespot-restimg"
                src={image.url}
                key={image.id}
              />
            ))
          ) : (
            <div>no images</div>
          )}
        </div>
      </div>
    </div>
  );
}
