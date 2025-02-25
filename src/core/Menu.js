import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../assets/logo.png"
import { itemTotal } from "./CartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#3b71ca", backgroundColor: "#fff" }
    } else {
        return { color: "#fff", backgroundColor: "transparent" }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary" >
            <Link to="/">
                <img className="logo"src={logo} alt="Logo" />
            </Link> 
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item "  style={{display: "flex"}}>
                    <Link className="nav-link "  to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
                </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Sign Up</Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => signout(() => {
                            history.push('/')
                        })} style={{ cursor: 'pointer', color: '#fff' }}>Sign Out</span>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && <li className="nav-item ml-auto mb-0">
                <Link className="nav-link d-flex pb-0" to="/cart" style={isActive(history, '/cart')}>
                <i className="material-symbols-outlined m-0 pb-0" >shopping_cart</i>
                <sup className="cartNumber">
                    <small className="cart-badge ">{itemTotal()}</small>
                </sup>
                </Link>
            </li>}
        </ul>
    </div>
)

export default withRouter(Menu)