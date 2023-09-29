import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import './Homepage.css';

function Homepage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleSignupClick = () => {
    window.open('/signup', '_blank');
  };

  const handleSigninClick = () => {
    window.open('/signin', '_blank');
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleCloseSignin = () => {
    setShowSignin(false);
  };

  return (
    <div className='container'>
      <h1 className='title'>Welcome to the Weather App</h1>
      <h4 className='subtitle'>
        Login to application to know the weather status{' '}
        <a href='#' className='link' onClick={handleSigninClick}>
          Login
        </a>
        {showSignin && <Signin onClose={handleCloseSignin} />}
      </h4>
      <h4 className='subtitle'>Or</h4>
      <h4 className='subtitle'>
        You can register in our application{' '}
        <a href='#' className='link' onClick={handleSignupClick}>
          Signup
        </a>
        {showSignup && <Signup onClose={handleCloseSignup} />}
      </h4>
    </div>
  );
}

export default Homepage;
