import { useEffect } from 'react';

import useLocalStorage from '../../util/hooks/useLocalStorage';
import { selectNewSavePayload, setCachedPayload } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

let lastSaved = 0;

export const Saver = () => {
  const [ , setLocalStorage ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);
  const savePayload = useSelector(selectNewSavePayload);
  const dispatch = useDispatch();

  useEffect(() => {
    // this check avoids trying to save the initialState on first load, maybe there's a better way around this.
    if(savePayload && !!savePayload.config.activePet){
      // console.log('> setLocalStorage', savePayload.config.lastSaved);
      setLocalStorage(() => savePayload);
      if(lastSaved !== savePayload.config.lastSaved){
        lastSaved = savePayload.config.lastSaved;
        dispatch(setCachedPayload(savePayload));
      }
    }
  }, [ savePayload, dispatch, setLocalStorage ])

  return null;
}
