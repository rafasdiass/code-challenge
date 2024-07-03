import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from '../ui/components/home';

Meteor.startup(() => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Home />);
});
