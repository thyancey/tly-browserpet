import { useEffect } from 'react';

import useLocalStorage from '../../util/hooks/useLocalStorage';
import { selectSavePayload } from '../../services/petstore';
import { defaultLocalStorageState } from '../../services/store';
import { useSelector } from 'react-redux';

export const Saver = () => {
  const [ _, setAppData ] = useLocalStorage('browserpet', defaultLocalStorageState);
  const savePayload = useSelector(selectSavePayload);

  useEffect(() => {
    // this check avoids trying to save the initialState on first load, maybe there's a better way around this.
    if(!!savePayload.config.activePet){
      console.log('(saving)', savePayload);
      setAppData(() => savePayload);
    }
  }, [ savePayload ])


  return null;
}
