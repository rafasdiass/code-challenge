import React, { useState } from 'react';
import useCommunities from './hooks/useCommunities';
import usePeopleByCommunity from './hooks/usePeopleByCommunity';
import CommunitySelector from './components/CommunitySelector';
import PeopleList from '../ui/components/PeopleList';
import { PeopleProvider } from '../ui/context/PeopleContext';

const App = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const communities = useCommunities();
  const people = usePeopleByCommunity(selectedCommunity) || [];

  const handleCommunityChange = (communityId) => {
    setSelectedCommunity(communityId);
  };

  return (
    <PeopleProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to the Quave Code Challenge</h1>
        <CommunitySelector
          communities={communities}
          selectedCommunity={selectedCommunity}
          onCommunityChange={handleCommunityChange}
        />
        <PeopleList people={people} />
      </div>
    </PeopleProvider>
  );
};

export default App;
