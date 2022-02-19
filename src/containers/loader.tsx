import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { jsonc } from 'jsonc';
import { setPet } from '../services/petstore';
import { LocalStorageState, PetDefinition } from '../types';
import useLocalStorage from '../util/hooks/useLocalStorage';
import { defaultLocalStorageState } from '../services/store';

const readIt = (dispatch:any, savedData: LocalStorageState) => {
  const url =  `assets/data.jsonc`;

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
        // console.log(`data was read successfully`, json);
        // console.log('but id like to start with ', savedData)
        json.forEach((petDef: PetDefinition) => {
          const savedStatus = savedData?.pets.find(p => p.id === petDef.id) || null;
          dispatch(setPet({
            petDefinition: petDef,
            initialState: savedStatus
          }))
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
  const [ appData, _ ] = useLocalStorage('browserpet', defaultLocalStorageState);

  useEffect(() => {
    if(!loaded){
      (global as any).hello = appData;
      setLoaded(true);
      readIt(dispatch, appData);
    }
  }, [ loaded, appData, setLoaded ]);

  return (null);
}
