import React from 'react';
import PropTypes from 'prop-types';

const EventSelector = ({ events, onSelect }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select an event (community)
    </label>
    <select
      className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select an event</option>
      {events.map(event => (
        <option key={event._id} value={event._id}>{event.name}</option>
      ))}
    </select>
  </div>
);

EventSelector.propTypes = {
  events: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EventSelector;
