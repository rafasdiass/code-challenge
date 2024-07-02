// client/hooks.js
import { useState, useEffect } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities';
import { People } from '../people/people';

export const useCommunities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      Meteor.subscribe('communities');
      setCommunities(Communities.find().fetch());
    });

    return () => {
      computation.stop();
    };
  }, []);

  return communities;
};

export const usePeopleByCommunity = (communityId) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      Meteor.subscribe('peopleByCommunity', communityId);
      setPeople(People.find({ communityId }).fetch());
    });

    return () => {
      computation.stop();
    };
  }, [communityId]);

  return people;
};
