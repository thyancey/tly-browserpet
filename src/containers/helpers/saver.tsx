import { useEffect } from 'react';

import useLocalStorage from '../../util/hooks/useLocalStorage';
import { selectNewSavePayload, setCachedPayload } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

export const Saver = () => {
  const [ , setLocalStorage ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);
  const savePayload = useSelector(selectNewSavePayload);
  const dispatch = useDispatch();

  useEffect(() => {
    // this check avoids trying to save the initialState on first load, maybe there's a better way around this.
    if(savePayload && !!savePayload.config.activePet){
      console.log('\n\n(saving)', savePayload);
      setLocalStorage(() => savePayload);
      dispatch(setCachedPayload(savePayload));
    }
  }, [ savePayload, dispatch, setLocalStorage ])

  return null;
}
