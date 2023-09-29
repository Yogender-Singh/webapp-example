import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', signupData);
      setSuccessMsg('Account created successfully');
      // navigate to Weather component with name as props
      navigate(`/weather?name=${signupData.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleSignup} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={signupData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
        <div className="signin-link">
          Already have an account? <a href="/signin">Sign in</a>
        </div>
        {successMsg && <div className="success-msg">{successMsg}</div>}
      </form>
    </div>
  );
};

export default Signup;
