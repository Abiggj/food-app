/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  localStorage.setItem('temp', "first");
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky" style={{ boxShadow: "0px 10px 20px #333", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/" style={{ color: '#9370db' }}>Foodos</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/" style={{ color: '#f2f2f2' }}>Home</Link>
              </li>
              {(localStorage.getItem("token")) ? <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" style={{ color: '#f2f2f2' }}>My Orders</Link>
              </li> : ""}
            </ul>
            {(!localStorage.getItem("token")) ? <form className="d-flex">
              <Link className="btn bg-purple text-white mx-1" to="/login">Login</Link>
              <Link className="btn bg-purple text-white mx-1" to="/signup">Signup</Link>
            </form> : <div>
              <div className="btn bg-purple text-white mx-2" onClick={loadCart}>
                <Badge color="secondary" badgeContent={items.length}>
                  <ShoppingCartIcon style={{ color: '#f2f2f2' }} />
                </Badge>
                Cart
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
              <button onClick={handleLogout} className="btn bg-purple text-white">Logout</button>
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}