import React from 'react';
import PropTypes from 'prop-types';

const PeopleList = ({ people, onCheckIn, onCheckOut }) => (
  <div className="my-4">
    <h2 className="text-xl font-semibold">People</h2>
    <ul className="mt-2">
      {people.map((person) => (
        <li key={person._id} className="py-2">
          <div className="flex items-center justify-between">
            <div>
              <p>{person.firstName} {person.lastName}</p>
              <p className="text-sm text-gray-500">{person.companyName || 'N/A'}</p>
              <p className="text-sm text-gray-500">{person.title || 'N/A'}</p>
              <p className="text-sm text-gray-500">Check-in: {person.checkInDate || 'N/A'}</p>
              <p className="text-sm text-gray-500">Check-out: {person.checkOutDate || 'N/A'}</p>
            </div>
            <div>
              {!person.checkInDate ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => onCheckIn(person._id)}
                >
                  Check-in
                </button>
              ) : (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => onCheckOut(person._id)}
                >
                  Check-out
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

PeopleList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    title: PropTypes.string,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
  })).isRequired,
  onCheckIn: PropTypes.func.isRequired,
  onCheckOut: PropTypes.func.isRequired,
};

export default PeopleList;
