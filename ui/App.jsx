import React, { useState } from 'react';
import EventSelector from './components/EventSelector';
import PeopleList from './components/PeopleList';
import { useCommunities, usePeopleByCommunity } from '../client/hooks';

const App = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const communities = useCommunities();
  const people = usePeopleByCommunity(selectedCommunity);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to the Quave Code Challenge</h1>
      <EventSelector events={communities} onSelect={setSelectedCommunity} />
      <PeopleList
        people={people}
        onCheckIn={(personId) => Meteor.call('checkInPerson', personId)}
        onCheckOut={(personId) => Meteor.call('checkOutPerson', personId)}
      />
    </div>
  );
};

export default App;
