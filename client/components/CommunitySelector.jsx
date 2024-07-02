import React from 'react';

export const CommunitySelector = ({ communities, selectedCommunity, onCommunityChange }) => (
  <div className="my-4">
    <label htmlFor="community-selector" className="block text-sm font-medium text-gray-700">
      Select an event (community)
    </label>
    <select
      id="community-selector"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      onChange={onCommunityChange}
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
