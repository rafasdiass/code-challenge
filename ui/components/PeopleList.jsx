import React from 'react';
import PropTypes from 'prop-types';
import { usePeopleContext } from '../context/PeopleContext';
import { Meteor } from 'meteor/meteor';
import { CHECK_IN, CHECK_OUT, RESET } from '../context/constants';

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleString('en-US', options);
};

const PeopleList = ({ people }) => {
  const { state, dispatch } = usePeopleContext();

  const handleCheckIn = (personId) => {
    Meteor.call('checkInPerson', personId, (error) => {
      if (error) {
        console.error('Error checking in person:', error);
        alert(`Error: ${error.reason}`);
      } else {
        dispatch({ type: CHECK_IN, personId });
        console.log(`Person ${personId} checked in successfully.`);
      }
    });
  };

  const handleCheckOut = (personId) => {
    Meteor.call('checkOutPerson', personId, (error) => {
      if (error) {
        console.error('Error checking out person:', error);
        alert(`Error: ${error.reason}`);
      } else {
        dispatch({ type: CHECK_OUT, personId });
        console.log(`Person ${personId} checked out successfully.`);
      }
    });
  };

  const handleReset = (personId) => {
    Meteor.call('resetPerson', personId, (error) => {
      if (error) {
        console.error('Error resetting person:', error);
        alert(`Error: ${error.reason}`);
      } else {
        dispatch({ type: RESET, personId });
        console.log(`Person ${personId} reset successfully.`);
      }
    });
  };

  if (!people || people.length === 0) {
    return <p className="text-center text-gray-500">No people available for this community.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {people.map(person => {
        const personState = state.people[person._id] || { checkInDate: false, checkOutDate: false };
        return (
          <li key={person._id} id={`person-${person._id}`} className="flex justify-between items-center py-4">
            <div className="person-info">
              <strong className="block text-xl font-bold">{person.firstName} {person.lastName}</strong>
              <p className="text-gray-700">{person.title || 'N/A'}</p>
              <p className="text-gray-700">{person.companyName || 'N/A'}</p>
              <p className="text-date">Check-in: {formatDate(person.checkInDate)}</p>
              <p className="text-date">Check-out: {formatDate(person.checkOutDate)}</p>
            </div>
            <div className="person-actions flex items-center space-x-2 ml-auto">
              <button
                className={`check-in-button ${personState.checkInDate ? 'btn-disabled' : 'btn-primary'} text-white rounded px-4 py-2 btn-margin`}
                onClick={() => handleCheckIn(person._id)}
                disabled={personState.checkInDate}
              >
                Check-in
              </button>
              <button
                className={`check-out-button ${!personState.checkInDate || personState.checkOutDate ? 'btn-disabled' : 'btn-secondary'} text-white rounded px-4 py-2 btn-margin`}
                onClick={() => handleCheckOut(person._id)}
                disabled={!personState.checkInDate || personState.checkOutDate}
              >
                Check-out
              </button>
              <button
                className="bg-yellow-500 text-white rounded px-4 py-2 btn-margin"
                onClick={() => handleReset(person._id)}
              >
                🗑️
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
};

export default PeopleList;
