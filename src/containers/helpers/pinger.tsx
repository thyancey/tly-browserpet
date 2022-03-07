import { useState } from 'react';

import useInterval from '../../util/hooks/useInterval';
import { pingStore } from '../../services/petstore';
import { useDispatch } from 'react-redux';
import { log } from '../../util/tools';

const PING_RATE = 2000;
const SAVE_RATE = 2000;

export const Pinger = () => {
  const [pinger, setPinger] = useState(0);
  const dispatch = useDispatch();

  useInterval(() => {
    const t = new Date().getTime();
    const nextPinger = pinger + 1;
    setPinger(nextPinger);
    if((((nextPinger) * PING_RATE) % SAVE_RATE) === 0){
      log(`----SAVE: ${nextPinger}------- `);
      dispatch(pingStore({ time: t, doSave: true}));
    }else{
      log(`----PING: ${nextPinger}------- `);
      dispatch(pingStore({ time: t, doSave: false}));
    }
  }, PING_RATE);

  return null;
}
