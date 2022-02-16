import React from 'react';
import { pingStore } from '../services/ui';

import { useAppDispatch, useInterval } from '../services/hooks';

export const Helper = () => {
  const [pinger, setPinger] = React.useState(0);
  const dispatch = useAppDispatch();

  useInterval(() => {
    setPinger(pinger + 1);
    dispatch(pingStore());
  }, 200);

  return null;
}
