import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addContactNumber, showInbox } from '../../actions/number';

import Spinner from '../extra/Spinner';

const Contact = ({ numbers, addContactNumber }) => {
  const [contact, setContact] = useState({
    contactName: '',
    contactNumber: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      contactName: contact.contactName,
      contactNumber: contact.contactNumber,
    };

    addContactNumber(newContact);

    setContact({
      contactName: '',
      contactNumber: '',
    });
  };

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col col-md-4'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label>Contact Name</label>
              <input
                type='text'
                value={contact.contactName}
                onChange={(e) =>
                  setContact({ ...contact, contactName: e.target.value })
                }
                className='form-control'
                placeholder='Dhencio'
              />
            </div>
            <div className='form-group'>
              <label>Contact Number</label>
              <input
                type='text'
                value={contact.contactNumber}
                onChange={(e) =>
                  setContact({ ...contact, contactNumber: e.target.value })
                }
                className='form-control'
                placeholder='+639772337508'
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={
                contact.contactName.length <= 0 ||
                contact.contactNumber.length <= 0
              }
            >
              Save
            </button>
          </form>
        </div>
        <div className='col col-md-8'>
          {numbers.numbers !== null &&
          numbers.numbers !== undefined &&
          numbers.numbers.length > 0 ? (
            <>
              <table className='table table-hover table-bordered'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Number</th>
                  </tr>
                </thead>
                <tbody>
                  {numbers.numbers.map((numb) => (
                    <tr key={numb._id} className='table-active'>
                      <th scope='row'>{numb.contactName}</th>
                      <td>{numb.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              {!numbers.loading ? (
                <div className='alert alert-dismissible alert-warning text-center'>
                  <h4 className='alert-heading'>Warning!</h4>
                  <p className='mb-0'>NO CONTACTS YET</p>
                </div>
              ) : (
                <Spinner />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  auth: PropTypes.object.isRequired,
  numbers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  numbers: state.numbers,
});

export default connect(mapStateToProps, { addContactNumber, showInbox })(
  Contact
);
