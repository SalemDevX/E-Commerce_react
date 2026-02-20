import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../logo.png";
import cart_icon from "../cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();

  // close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><p>SHOOPER</p></Link> 
        </div>

        {/* Desktop menu */}
        <ul className="nav-menu">
          <li>
            <Link to="/">Shop</Link>
            {isActive("/") ? <hr /> : null}
          </li>
          <li>
            <Link to="/mens">Men</Link>
            {isActive("/mens") ? <hr /> : null}
          </li>
          <li>
            <Link to="/womens">Women</Link>
            {isActive("/womens") ? <hr /> : null}
          </li>
          <li>
            <Link to="/kids">Kids</Link>
            {isActive("/kids") ? <hr /> : null}
          </li>
        </ul>

        {/* Right actions */}
        <div className="nav-login-cart">
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/cart" className="nav-cart" aria-label="Cart">
            <img src={cart_icon} alt="Cart" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </Link>

          {/* Hamburger */}
          <button
            className={`nav-toggle ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className={`nav-mobile ${isOpen ? "show" : ""}`}>
        <ul>
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/">Shop</Link>
          </li>
          <li className={isActive("/mens") ? "active" : ""}>
            <Link to="/mens">Men</Link>
          </li>
          <li className={isActive("/womens") ? "active" : ""}>
            <Link to="/womens">Women</Link>
          </li>
          <li className={isActive("/kids") ? "active" : ""}>
            <Link to="/kids">Kids</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;