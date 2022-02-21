import { useEffect, useState } from 'react';
import { jsonc } from 'jsonc';

import { LocalStorageState, PetDefinition } from '../../types';
import useLocalStorage from '../../util/hooks/useLocalStorage';
import { createPet, setActiveId } from '../../services/petstore';
import { defaultLocalStorageState } from '../../services/store';
import { useDispatch } from 'react-redux';


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
        console.log(`data was read successfully`, json);
        console.log(`saved data was read successfully`, savedData);
        json.forEach((petDef: PetDefinition) => {
          const savedStatus = savedData?.pets.find(p => p.id === petDef.id) || null;
          dispatch(createPet({
            petDefinition: petDef,
            initialState: savedStatus
          }));
        });

        if(savedData.config.activePet){
          dispatch(setActiveId(savedData.config.activePet));
        }

        return true;
      }, 
      err => {
        console.error(`Error parsing (the url (${url}) was bad), skipping`, err?.stack || err);
      }
    );
}

export const Loader = () => {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const [ appData, ] = useLocalStorage('browserpet', defaultLocalStorageState);

  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      readIt(dispatch, appData);
    }
  }, [ loaded, appData, setLoaded ]);

  return (null);
}
