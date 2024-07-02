import React from 'react';
import EventSelector from './components/EventSelector';
import PeopleList from './components/PeopleList';

const App = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold">Welcome to the Quave Code Challenge</h1>
    <EventSelector />
    <PeopleList />
  </div>
);

export default App;
