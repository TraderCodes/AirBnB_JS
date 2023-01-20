import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSingleSpot, getSingleSpotTK } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
const UpdateSpotForm = ({ setModal, spotId }) => {
  const spot = useSelector((state) => state.spots.singleSpot);
  const {closeModal} = useModal()
  const history = useHistory();
  const dispatch = useDispatch();
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getSingleSpotTK(+spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name);
      setCity(spot.city);
      setPrice(spot.price);
      setState(spot.state);
      setCountry(spot.country);
      setAddress(spot.address);
      setDescription(spot.description);
    }
  }, [spot]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const spotInfo = {
      name,
      description,
      address,
      city,
      state,
      country,
      lat,
      lng,
      price,
    };

    dispatch(updateSingleSpot(spotInfo, +spotId))
      .then((res) => closeModal())
      .then((res) => history.push(`/spots/${spotId}`))
      .catch(async (res) => {
        if (res === undefined) return null;
        const message = await res.json();
        if (message && message.errors) setErrors(message.errors)
        else{
        // ()=>  closeModal()
        }
      });

    //  history.push(`/spots/${spotId}`)
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeModal()
    history.push(`/my-spots`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Spot Edit</div>
        <div>
          <div>Update your spot</div>
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

          <div >
            <label >
              City
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}

              />
            </label>
          </div>

          <div >
            <label >
              State
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}

              />
            </label>
          </div>

          <div >
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

          <div >
            <label >
              lat
              <input
                type="decimel"
                min="-90"
                max="90"
                value={lat}
                onChange={(e) => setLat(e.target.value)}

              />
            </label>
          </div>

          <div>
            <label >
              lng
              <input
                type="decimel"
                min="-190"
                max="190"
                value={lng}
                onChange={(e) => setLng(e.target.value)}

              />
            </label>
          </div>

          <div >
            <label >
              Spot Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="createSpot-inputField"
              />
            </label>
          </div>

          <div className="inputContainer" id="middle-label">
            <label className="create-spot-label">
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="createSpot-inputField"
              />
            </label>
          </div>

          <div >
            <label >
              Price A night
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}

              />
            </label>
          </div>



          <div>
            <button type="submit" className="styledButton">
              Update
            </button>
            <button
              type="button"
              onClick={()=>closeModal()}

            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSpotForm;
