import React from 'react';
import PropTypes from 'prop-types';

const CommunitySelector = ({ communities, selectedCommunity, onCommunityChange }) => (
  <div className="mb-4 p-4 bg-white shadow rounded max-w-md mx-auto">
    <label
      htmlFor="community-selector"
      className="block text-lg font-medium text-gray-700 mb-2"
    >
      Select an event (community)
    </label>
    <select
      id="community-selector"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e) => onCommunityChange(e.target.value)}
      value={selectedCommunity ? selectedCommunity._id : ''}
    >
      <option value="" disabled>Select an event</option>
      {communities.map((community) => (
        <option key={community._id} value={community._id}>
          {community.name}
        </option>
      ))}
    </select>
  </div>
);

CommunitySelector.propTypes = {
  communities: PropTypes.array.isRequired,
  selectedCommunity: PropTypes.string,
  onCommunityChange: PropTypes.func.isRequired,
};

export default CommunitySelector;
