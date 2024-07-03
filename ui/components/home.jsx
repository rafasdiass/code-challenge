import React, { useState } from 'react';
import useCommunities from '../../client/hooks/useCommunities';
import usePeopleByCommunity from '../../client/hooks/usePeopleByCommunity';
import CommunitySelector from '../../client/components/CommunitySelector';
import PeopleList from './PeopleList';
import { PeopleProvider } from '../context/PeopleContext';

const Home = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const communities = useCommunities();
  const people = usePeopleByCommunity(selectedCommunity) || [];

  const handleCommunityChange = (communityId) => {
    setSelectedCommunity(communityId);
  };

  const checkedInPeople = people.filter(person => person.checkInDate && !person.checkOutDate).length;
  const peopleByCompany = people.reduce((acc, person) => {
    if (person.checkInDate && !person.checkOutDate) {
      acc[person.companyName] = (acc[person.companyName] || 0) + 1;
    }
    return acc;
  }, {});

  const notCheckedInPeople = people.filter(person => !person.checkInDate).length;

  return (
    <PeopleProvider>
      <div className="container mx-auto p-4 bg-main">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Welcome to the Quave Code Challenge</h1>
        <CommunitySelector
          communities={communities}
          selectedCommunity={selectedCommunity}
          onCommunityChange={handleCommunityChange}
        />
        <div className="my-6 p-4 border border-main rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="mb-1">People in the event right now: {checkedInPeople}</p>
          <p className="mb-1">People by company in the event right now:</p>
          <ul className="ml-4 mb-1">
            {Object.entries(peopleByCompany).map(([company, count]) => (
              <li key={company}>{company}: {count}</li>
            ))}
          </ul>
          <p>People not checked in: {notCheckedInPeople}</p>
        </div>
        {people.length > 0 ? (
          <PeopleList people={people} />
        ) : (
          <p className="text-center text-gray-500">Select an event to see people.</p>
        )}
      </div>
    </PeopleProvider>
  );
};

export default Home;
