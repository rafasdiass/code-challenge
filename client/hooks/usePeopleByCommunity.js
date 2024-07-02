import { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { People } from '../../people/people.js';
import { Meteor } from 'meteor/meteor';

const usePeopleByCommunity = (communityId) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      Meteor.subscribe('peopleByCommunity', communityId);
      setData(People.find({ communityId }).fetch());
    });

    return () => {
      computation.stop();
    };
  }, [communityId]);

  return data;
};

export default usePeopleByCommunity;
