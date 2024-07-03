// client/hooks.js
import { useState, useEffect } from 'react';
import { Tracker } from 'meteor/tracker';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import useSubscription from './hooks/useSubscription';

export const useCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const loading = useSubscription('communities');

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      if (!loading) {
        setCommunities(Communities.find().fetch());
      }
    });

    return () => {
      computation.stop();
    };
  }, [loading]);

  return communities;
};

export const usePeopleByCommunity = (communityId) => {
  const [people, setPeople] = useState([]);
  const loading = useSubscription('peopleByCommunity', communityId);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      if (!loading && communityId) {
        setPeople(People.find({ communityId }).fetch());
      }
    });

    return () => {
      computation.stop();
    };
  }, [communityId, loading]);

  return people;
};
