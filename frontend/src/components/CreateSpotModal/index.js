import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createOneSpot } from '../../store/spots';
import './CreateSpotModal.css';

const CreateSpotForm = ({ setModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [url, setUrl] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [preview, setPreview] = useState(true);
  const [description, setDescription] = useState('');



  return (
    <div>
      <form >
        <div>Please Fill Below!</div>
        <div>
          <div>Create your spot</div>
          <ul>
            {errors && errors.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <div>
            <label>
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
            <label>
              City
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>

          <div c>
            <label>
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
            <label>
              Country
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
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
          </div>

          <div>
            <label>
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
          </div>

          <div>
            <label>
              Spot name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Price a night
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>

          <div className="inputContainer" id="middle-label">
            <label className="create-spot-label">
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
            <label>
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
            <button type="submit">Create new Spot !</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;
