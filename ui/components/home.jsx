// ui/components/Home.jsx
import React, { useState } from 'react';
import useCommunities from '../../client/hooks/useCommunities';
import usePeopleByCommunity from '../../client/hooks/usePeopleByCommunity';
import CommunitySelector from '../../client/components/CommunitySelector';
import PeopleList from '../components/PeopleList';
import Summary from './sumary';
import { PeopleProvider } from '../context/PeopleContext';

const Home = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const communities = useCommunities();
  const people = usePeopleByCommunity(selectedCommunity) || [];

  const handleCommunityChange = (communityId) => {
    setSelectedCommunity(communityId);
  };

  return (
    <PeopleProvider>
      <div className="container mx-auto p-4 bg-main">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Welcome to the Quave Code Challenge</h1>
        <CommunitySelector
          communities={communities}
          selectedCommunity={selectedCommunity}
          onCommunityChange={handleCommunityChange}
        />
        <Summary people={people} />
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
