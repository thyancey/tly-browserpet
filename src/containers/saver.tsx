import { useEffect } from 'react';

import { useAppSelector } from '../services/hooks';
import { selectSavePayload } from '../services/petstore';
import { defaultLocalStorageState } from '../services/store';
import useLocalStorage from '../util/hooks/useLocalStorage';

export const Saver = () => {
  const [ _, setAppData ] = useLocalStorage('browserpet', defaultLocalStorageState);
  const savePayload = useAppSelector(selectSavePayload);

  useEffect(() => {
    console.log('savePayload?:', savePayload);

    if(savePayload.length > 0){
      console.log('(actually saving)');
      setAppData(prev => ({
        config: prev.config,
        pets: savePayload
      }));
    }
  }, [ savePayload ])


  return null;
}
