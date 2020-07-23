import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [state, setState] = useState({
    email: '',
    password1: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const loginUser = {
      email: state.email,
      password: state.password1,
    };
    login(loginUser);

    setState({
      email: '',
      password1: '',
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col col-md-6 mx-auto border border-primary'>
          <form onSubmit={(e) => onSubmit(e)} className='m-4'>
            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                value={state.email}
                className='form-control'
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder='juandelacruz@text.com'
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                value={state.password1}
                className='form-control'
                onChange={(e) =>
                  setState({ ...state, password1: e.target.value })
                }
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
