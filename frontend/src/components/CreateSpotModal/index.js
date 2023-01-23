import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { createSingleSpotTK } from '../../store/spots';
import './CreateSpotModal.css';

const CreateSpotModal = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [url, setUrl] = useState('');
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [preview, setPreview] = useState(true);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address,
      state,
      city,
      // lat,
      country,
      // lng,
      name,
      description,
      price,
      url,
    };
    const imgData = { url, preview };

    dispatch(createSingleSpotTK(data, imgData))
      .then((newSpot) => history.push(`/spots/${newSpot.id}`))
      .then(closeModal)
      .catch(async (res) => {
        if (res === undefined) return null;
        const message = await res.json();
        if (message && message.errors) setErrors(message.errors);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div>Please Fill Below!</div> */}
        <div>
          <div className="modalHead">Create your spot</div>
          <ul>
            {errors &&
              errors.map((error, id) => (
                <div style={{ color: 'red' }} key={id}>
                  {error}
                </div>
              ))}
          </ul>

          <div>
            <label className="form-label">
              Address
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              City
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              State
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Country
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>
{/*
          <div>
            <label className="form-label">
              lat
              <input
                type="decimel"
                min="-80"
                max="80"
                placeholder="55.523"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
          </div> */}

          {/* <div>
            <label className="form-label">
              lng
              <input
                type="decimel"
                min="-180"
                max="180"
                placeholder="66.432"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
          </div> */}

          <div>
            <label className="form-label">
              Spot name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Price a night $
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Img url
              <input
                type="text"
                placeholder="http://"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Set Preview Image
              <select
                onChange={(e) => setPreview(e.target.value)}
                value={preview}
              >
                <option key="false">false</option>
                <option key="true">true</option>
              </select>
            </label>
          </div>
          <div>
            <button className="modal-submit-button" type="submit">
              Create new Spot !
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotModal;
