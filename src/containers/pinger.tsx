import React from 'react';
import { pingStore } from '../services/ui';

import { useAppDispatch } from '../services/hooks';
import useInterval from '../util/hooks/useInterval';

export const Pinger = () => {
  const [pinger, setPinger] = React.useState(0);
  const dispatch = useAppDispatch();

  useInterval(() => {
    setPinger(pinger + 1);
    dispatch(pingStore());
  }, 1000);

  return null;
}
