import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../extra/Spinner';

const Inbox = () => {
  const inbox = useSelector((state) => state.numbers);
  const renderInboxList = () => {
    return inbox.inbox.map((message) => {
      return (
        <tr key={message._id} className='table-active'>
          <th scope='row'>{message.to}</th>
          <td>{message.message}</td>
        </tr>
      );
    });
  };
  return (
    <div className='row mt-5'>
      <div className='col col-md-10 mx-auto'>
        {inbox.inbox !== null &&
        inbox.inbox !== undefined &&
        inbox.inbox.length > 0 ? (
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th scope='col'>To:</th>
                <th scope='col'>Message</th>
              </tr>
            </thead>
            <tbody>{!inbox.loading ? renderInboxList() : <Spinner />}</tbody>
          </table>
        ) : (
          <>
            {!inbox.loading ? (
              <div className='alert alert-dismissible alert-warning text-center'>
                <h4 className='alert-heading'>Warning!</h4>
                <p className='mb-0'>NO INBOX YET</p>
              </div>
            ) : (
              <Spinner />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
