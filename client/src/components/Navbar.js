import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Navbar = ({ auth, logout }) => {
  const authLinks = () => {
    return (
      <>
        <li className='nav-item active'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
        <li className='nav-item active'>
          <Link className='nav-link' to='/register'>
            Register
          </Link>
        </li>
      </>
    );
  };
  const guessLinks = () => {
    return (
      <>
        <li className='nav-item active'>
          <Link className='nav-link' to='/inbox'>
            Inbox
          </Link>
        </li>
        <li className='nav-item active'>
          <Link className='nav-link' to='/contacts'>
            Contacts
          </Link>
        </li>
        <li className='nav-item active'>
          <Link onClick={() => logout()} className='nav-link' to='/'>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarColor02'
        aria-controls='navbarColor02'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarColor02'>
        <div className='container'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'></li>
          </ul>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            {!auth.loading && auth.isAuthenticated ? guessLinks() : authLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
