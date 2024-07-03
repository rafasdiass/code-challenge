import { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { People } from '../../people/people.js';
import useSubscription from './useSubscription';

const usePeopleByCommunity = (communityId) => {
  const [data, setData] = useState([]);
  const loading = useSubscription('peopleByCommunity', communityId);

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      if (!loading && communityId) {
        setData(People.find({ communityId }).fetch());
      }
    });

    return () => {
      computation.stop();
    };
  }, [communityId, loading]);

  return data;
};

export default usePeopleByCommunity;
