// ui/components/Home.jsx
import React, { useState } from 'react';
import { useCommunities, usePeopleByCommunity } from '../../client/hooks.js';
import EventSelector from './EventSelector.jsx';
import PeopleList from './PeopleList.jsx';
import { PeopleProvider } from '../context/PeopleContext';

const Home = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const communities = useCommunities();
  const people = usePeopleByCommunity(selectedCommunity) || [];

  return (
    <PeopleProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to the Quave Code Challenge</h1>
        <EventSelector events={communities} onSelect={setSelectedCommunity} />
        {people.length > 0 ? (
          <PeopleList people={people} />
        ) : (
          <p>Select an event to see people.</p>
        )}
      </div>
    </PeopleProvider>
  );
};

export default Home;
