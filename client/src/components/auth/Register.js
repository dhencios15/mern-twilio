import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registers } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({ registers, isAuthenticated, setAlert }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.password1 !== state.password2) {
      setAlert('Password do not match', 'danger');
    } else {
      const newUser = {
        name: state.name,
        email: state.email,
        password: state.password1,
      };

      registers(newUser);

      setState({
        name: '',
        email: '',
        password1: '',
        password2: '',
      });
    }
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
              <label>Name</label>
              <input
                type='text'
                value={state.name}
                className='form-control'
                onChange={(e) =>
                  setState({
                    ...state,
                    name: e.target.value,
                  })
                }
                placeholder='e.g Dhencio'
              />
            </div>
            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                value={state.email}
                className='form-control'
                onChange={(e) =>
                  setState({
                    ...state,
                    email: e.target.value,
                  })
                }
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
                  setState({
                    ...state,
                    password1: e.target.value,
                  })
                }
              />
            </div>
            <div className='form-group'>
              <label>Confirm Password</label>
              <input
                name='password2'
                type='password'
                value={state.password2}
                onChange={(e) =>
                  setState({
                    ...state,
                    password2: e.target.value,
                  })
                }
                className='form-control'
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registers, setAlert })(Register);
