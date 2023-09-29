import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signin = (props) => {
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [userName, setUserName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
 
  const handleChange = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', signinData);
      const userResponse = await axios.get(`http://localhost:5000/user?email=${signinData.email}`);
      const { name } = userResponse.data;
      setUserName(name);
      setSuccessMsg('Account created successfully');
      navigate(`/weather?name=${name}&email=${signinData.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseClick = () => {
    props.onClose();
  };

  return (
    <div className="container">
      <h2 className="title">Sign In</h2>
      <form onSubmit={handleSignin} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signinData.email}
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
            value={signinData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Sign In</button>
        <div className="signin-link">
        To create an account click <a href="/signup">Here</a>
      </div>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      </form>
    </div>
  );
}

export default Signin;
