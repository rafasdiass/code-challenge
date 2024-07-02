// ui/components/PeopleList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { usePeopleContext } from '../context/PeopleContext';
import { Meteor } from 'meteor/meteor';
import { CHECK_IN, CHECK_OUT, RESET } from '../context/constants';

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
    dispatch({ type: RESET, personId });
    console.log(`Person ${personId} reset successfully.`);
  };

  if (!people || people.length === 0) {
    return <p>No people available for this community.</p>;
  }

  return (
    <ul>
      {people.map(person => {
        const personState = state.people[person._id] || { checkInDate: false, checkOutDate: false };
        return (
          <li key={person._id} id={`person-${person._id}`} className="flex justify-between items-center border-b border-gray-300 p-4">
            <div className="person-info">
              <strong className="block text-xl font-bold">{person.firstName} {person.lastName}</strong>
              <p className="text-gray-700">{person.title || 'N/A'}</p>
              <p className="text-gray-700">{person.companyName || 'N/A'}</p>
            </div>
            <div className="person-actions flex items-center space-x-2">
              <button
                className={`check-in-button ${personState.checkInDate ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-green-500'} text-white rounded px-4 py-2`}
                onClick={() => handleCheckIn(person._id)}
                disabled={personState.checkInDate}
              >
                Check-in
              </button>
              <button
                className={`check-out-button ${!personState.checkInDate ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-red-500'} text-white rounded px-4 py-2`}
                onClick={() => handleCheckOut(person._id)}
                disabled={!personState.checkInDate}
              >
                Check-out
              </button>
              <button
                className="bg-yellow-500 text-white rounded px-4 py-2"
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
