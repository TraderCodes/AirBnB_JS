import React from 'react';
import { useHistory } from 'react-router-dom';
import './Pagenotfound.css';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div >
      {/* <div >
        <h1>Page Not Found</h1>
      </div> */}

      <div className='pagenotfound' onClick={() => history.push('/')}>404 Click to go Home</div>
    </div>
  );
};

export default PageNotFound;
