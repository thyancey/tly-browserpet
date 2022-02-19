import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { jsonc } from 'jsonc';
import { setPet } from '../services/petstore';
import { PetDefinition } from '../types';
import useLocalStorage from '../util/hooks/useLocalStorage';
import { defaultLocalStorageState } from '../services/store';
// import useLocalStorage from '../util/hooks/useLocalStorage';
// import { defaultLocalStorageState } from '../services/store';

const readIt = (dispatch:any, appData:string) => {
  const url =  `assets/data.jsonc`;

  // const parsed = JSON.parse(appData)

  fetch(url, {
    mode: 'cors'
  })
    .then(res => res.text())
    .then(
      text => jsonc.parse(text), 
      err => {
        console.error(`Error fretching item from ${url}`, err);
      }
    ) //- bad url responds with 200/ok? so this doesnt get thrown
    .then(
      json => {
        console.log(`data was read successfully`, json);
        json.forEach((petDef: PetDefinition) => {
          dispatch(setPet(petDef));
        });

        return true;
      }, 
      err => {
        console.error(`Error parsing (the url (${url}) was bad), skipping`, err?.stack || err);
      }
    );
}

export const Loader = () => {
  const dispatch = useAppDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const [ appData, setAppData ] = useLocalStorage('browserpet', defaultLocalStorageState);

  // useEffect(() => {
  //   readIt(dispatch);
  // }, []);
  
  useEffect(() => {
    if(!loaded){
      console.log('LOADED!!! appData is', appData);

      (global as any).hello = appData;
      setLoaded(true);
      readIt(dispatch, appData);
    }
  }, [ loaded, appData, setLoaded ]);

  return (null);
}
