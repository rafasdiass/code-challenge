import { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { Communities } from '../../communities/communities.js';
import useSubscription from './useSubscription';

const useCommunities = () => {
  const [data, setData] = useState([]);
  const loading = useSubscription('communities');

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      if (!loading) {
        setData(Communities.find().fetch());
      }
    });

    return () => {
      computation.stop();
    };
  }, [loading]);

  return data;
};

export default useCommunities;
