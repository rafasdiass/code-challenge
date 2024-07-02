import { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { Communities } from '../../communities/communities.js';
import { Meteor } from 'meteor/meteor';

const useCommunities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      Meteor.subscribe('communities');
      setData(Communities.find().fetch());
    });

    return () => {
      computation.stop();
    };
  }, []);

  return data;
};

export default useCommunities;
