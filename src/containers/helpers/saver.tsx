import { useEffect } from 'react';

import useLocalStorage from '../../util/hooks/useLocalStorage';
import { selectNewSavePayload, setCachedPayload } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

export const Saver = () => {
  const [ localStorage, setLocalStorage ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);
  const savePayload = useSelector(selectNewSavePayload);
  const dispatch = useDispatch();

  // this needs to get reworked, cause adding 'setLocalStorage' to the dep. array causes a reload feedback loop
  useEffect(() => {
    // this check avoids trying to save the initialState on first load, maybe there's a better way around this.
    if(savePayload && !!savePayload.config.activePet){
      console.log('\n\n(saving)', savePayload);
      // console.log('had', localStorage);
      setLocalStorage(() => savePayload);
      dispatch(setCachedPayload(savePayload));
    }
  }, [ savePayload, dispatch ])

  // useEffect(() => {
  //   console.log('(localStorage)', localStorage);
  //   // console.log('had', localStorage);
  //   // setLocalStorage(() => savePayload);
  //   // dispatch(setSavedPetData(localStorage.pets));
  // }, [ localStorage, dispatch ])


  return null;
}
