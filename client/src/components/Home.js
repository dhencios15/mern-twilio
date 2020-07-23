import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getContactNumber, showInbox } from '../actions/number';

import UserHome from '../components/users/UserHome';
import Spinner from './extra/Spinner';

const Home = ({ auth }) => {
  const renderLandingPage = () => {
    return (
      <div className='container'>
        <div className='jumbotron text-center'>
          <h1 className='display-3'>Hello Everything!</h1>
          <p className='lead'>
            Pang text ? Maki Text ? Emergency Text ? Sign up na!
          </p>
          <hr className='my-4' />
          <p>Philippines Free SMS</p>
          <p className='lead'>
            <Link
              className='btn btn-primary btn-lg'
              to='/register'
              role='button'
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    );
  };

  return auth.isAuthenticated ? (
    <UserHome />
  ) : auth.loading ? (
    <Spinner />
  ) : (
    renderLandingPage()
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  // getContactNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
