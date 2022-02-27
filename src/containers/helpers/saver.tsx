import { useEffect } from 'react';

import useLocalStorage from '../../util/hooks/useLocalStorage';
import { selectNewSavePayload } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

export const Saver = () => {
  const [ , setLocalStorage ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);
  const savePayload = useSelector(selectNewSavePayload);
  const dispatch = useDispatch();

  // this needs to get reworked, cause adding 'setLocalStorage' to the dep. array causes a reload feedback loop
  useEffect(() => {
    // this check avoids trying to save the initialState on first load, maybe there's a better way around this.
    if(!!savePayload.config.activePet){
      console.log('(saving)', savePayload);
      setLocalStorage(() => savePayload);
    }
  }, [ savePayload, dispatch ])


  return null;
}
