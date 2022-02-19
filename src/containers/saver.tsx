import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../services/hooks';
import { selectSavePayload } from '../services/petstore';
import { defaultLocalStorageState } from '../services/store';
import useLocalStorage from '../util/hooks/useLocalStorage';

export const Saver = () => {
  const [ appData, setAppData ] = useLocalStorage('browserpet', defaultLocalStorageState);
  const savePayload = useAppSelector(selectSavePayload);

  useEffect(() => {
    console.log('savePayload', savePayload);

    if(savePayload){
      console.log('SAVING');
      setAppData(prev => savePayload)
    }

    // console.log('curAppData', appData);
    // setAppData(prev => ({
    //   config: prev.config,
    //   pets: savePayload
    // }))
    // setAppData()
    // setAppData(prev => ({
    //   config: appData.config,
    //   pets: savePayload
    // }))
  }, [ savePayload, setAppData ])


  return null;
}
