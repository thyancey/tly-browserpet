import { useState } from 'react';

import useInterval from '../../util/hooks/useInterval';
import { pingStore } from '../../services/ui';
import { useDispatch } from 'react-redux';

const PING_RATE = 2000;
const SAVE_RATE = 2000;
// const SAVE_RATE = 6000;

export const Pinger = () => {
  const [pinger, setPinger] = useState(0);
  const dispatch = useDispatch();

  useInterval(() => {
    const t = new Date().getTime();
    setPinger(pinger + 1);
    console.log(`----PING: ${pinger + 1}------- `);
    if((((pinger + 1) * PING_RATE) % SAVE_RATE) === 0){
      dispatch(pingStore({ time: t, doSave: true}));
    }else{
      dispatch(pingStore({ time: t, doSave: false}));
    }
  }, PING_RATE);

  return null;
}
