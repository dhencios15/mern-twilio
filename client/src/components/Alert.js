import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className='container'>
      <div className='row'>
        <div className='col col-md-6 mx-auto'>
          <div className={` alert alert-dismissible alert-${alert.alertType}`}>
            <button type='button' className='close' data-dismiss='alert'>
              &times;
            </button>
            <strong>{alert.msg}</strong>
          </div>
        </div>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
