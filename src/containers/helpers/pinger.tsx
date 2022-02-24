import React, { useEffect, useState } from 'react';

import useInterval from '../../util/hooks/useInterval';
import { pingStore, selectLastSaved } from '../../services/ui';
import { triggerSave } from '../../services/petstore';
import { useDispatch, useSelector } from 'react-redux';

const PING_RATE = 1000;
const SAVE_RATE = 5000;

export const Pinger = () => {
  const [pinger, setPinger] = useState(0);
  const lastSaved = useSelector(selectLastSaved);
  const dispatch = useDispatch();

  useInterval(() => {
    const t = new Date().getTime();
    setPinger(pinger + 1);

    if((((pinger + 1) * PING_RATE) % SAVE_RATE) === 0){
      dispatch(pingStore({ time: t, doSave: true}));
      // dispatch(pingStore({ time: t, doSave: false}));
    }else{
      dispatch(pingStore({ time: t, doSave: false}));
    }
  }, PING_RATE);

  useEffect(() => {
    dispatch(triggerSave(lastSaved)); // TODO: this double dispatch may be an antipattern
  }, [ lastSaved ])

  return null;
}
