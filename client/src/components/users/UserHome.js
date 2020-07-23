import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions/number';
import { setAlert } from '../../actions/alert';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContactNumber } from '../../actions/number';

import Spinner from '../extra/Spinner';

const UserHome = ({ sendMessage, setAlert, getContactNumber }) => {
  useEffect(() => {
    getContactNumber();
  }, [getContactNumber]);

  const contacts = useSelector((state) => state.numbers);

  const [state, setState] = useState({
    to: '',
    message: '',
  });

  const [toggle, setToggle] = useState({
    select: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const newMessge = {
      contactNumber: state.to,
      message: state.message,
    };
    sendMessage(newMessge);
    setState({
      to: '',
      message: '',
    });
  };

  const handleToggle = () => {
    setToggle({
      select: !toggle.select,
    });

    setState({
      ...state,
      to: '',
    });
  };

  return (
    <div className='container'>
      <div className='row mt-5'>
        {contacts !== null && contacts !== undefined ? (
          <div className='col col-md-6 mx-auto border border-primary'>
            <form onSubmit={(e) => onSubmit(e)} className='m-4'>
              <div className='form-group'>
                <label>Phone Number</label>
                <div class='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    class='custom-control-input'
                    id='customSwitch1'
                    checked={toggle.select}
                    onChange={() => handleToggle()}
                  />
                  <label class='custom-control-label' for='customSwitch1'>
                    Toggle input
                  </label>
                </div>
                <br />
                {toggle.select ? (
                  <select
                    className='form-control'
                    value={state.to}
                    onChange={(e) => setState({ ...state, to: e.target.value })}
                  >
                    <option value=''> Select Number</option>
                    {contacts.numbers.map((numb) => (
                      <option key={numb._id} value={numb.contactNumber}>
                        {`${numb.contactName} - ${numb.contactNumber}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type='test'
                    value={state.to}
                    className='form-control'
                    onChange={(e) => setState({ ...state, to: e.target.value })}
                    placeholder='Input Number'
                  />
                )}

                {/* {contacts !== null &&
                contacts !== undefined &&
                contacts.numbers.length > 0 ? (
                 
                ) : (
                 
                )}  */}
              </div>
              <div className='form-group'>
                <label>Example textarea</label>
                <textarea
                  className='form-control'
                  value={state.message}
                  onChange={(e) =>
                    setState({ ...state, message: e.target.value })
                  }
                  rows='5'
                ></textarea>
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={state.message.length <= 0 || state.to.length <= 0}
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

// UserHome.propTypes = {
//   numbers: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   numbers: state.numbers,
// });

export default connect(null, {
  sendMessage,
  setAlert,
  getContactNumber,
})(UserHome);
