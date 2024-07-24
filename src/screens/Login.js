import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      setError("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="login-container animated fadeInDown">
          <form className="w-100 m-auto mt-5" onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone.
              </div>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                name="password"
              />
            </div>
            {error && <div className="error-message animated shake">{error}</div>}
            <button type="submit" className="m-3 btn btn-custom">
              Submit
            </button>
            <Link to="/signup" className="m-3 mx-1 btn btn-danger">
              New User
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}