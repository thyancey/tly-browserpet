import React from 'react';

import useInterval from '../../util/hooks/useInterval';
import { pingStore } from '../../services/ui';
import { triggerSave } from '../../services/petstore';
import { useDispatch } from 'react-redux';

const PING_RATE = 1000;
const SAVE_RATE = 5000;

export const Pinger = () => {
  const [pinger, setPinger] = React.useState(0);
  const dispatch = useDispatch();

  useInterval(() => {
    setPinger(pinger + 1);
    dispatch(pingStore());

    if((((pinger + 1) * PING_RATE) % SAVE_RATE) === 0){
      dispatch(triggerSave()); // TODO: this double dispatch may be an antipattern
    }
  }, PING_RATE);

  return null;
}