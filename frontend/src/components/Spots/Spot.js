import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../images/noimage.jpg';
export default function Spot({ spot }) {
  return (
    <div className="outer-container">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/spots/${spot.id}`}
      >
        <div>
          {spot.previewImage ? (
            <div>
              <img src={spot.previewImage} style={{ height: '200px' }} />
            </div>
          ) : (
            <div>
              <img style={{ height: '50px' }} src={noImage} alt="noimage" />
            </div>
          )}
        </div>

        <div>
          <div>
            <div>
              {spot.city}, {spot.state}
            </div>

            <div>
              {spot.avgRating ? (
                <span>★ {spot.avgRating}</span>
              ) : (
                <span>★ New</span>
              )}
            </div>
          </div>
          <div>{spot.country}</div>
          <div>
            ${spot.price} <span>night</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
