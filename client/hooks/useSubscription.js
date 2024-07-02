// client/hooks/useSubscription.js
import { Meteor } from 'meteor/meteor';
import { useEffect, useState } from 'react';

const useSubscription = (publication, ...args) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = Meteor.subscribe(publication, ...args, {
      onReady: () => setLoading(false),
      onStop: () => setLoading(false),
    });

    return () => {
      handle.stop();
      setLoading(true);
    };
  }, [publication, ...args]);

  return [loading];
};

export default useSubscription;
