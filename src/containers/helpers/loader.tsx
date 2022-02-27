import { useEffect, useState } from 'react';
import { jsonc } from 'jsonc';

import { LocalStorageState, PetDefinition } from '../../types';
import useLocalStorage from '../../util/hooks/useLocalStorage';
import { addInteractionEvent, createPet, removeInteractionEvent, restoreInteractionFromSave, setActiveId } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch } from 'react-redux';
import { pingStore } from '../../services/ui';
import { Dispatch } from '@reduxjs/toolkit';


const readIt = (dispatch:any, savedData: LocalStorageState) => {
  console.log('READ IT')
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
        const now = new Date().getTime();
        console.log(`JSON definitions parsed successfully`, json);
        console.log(`LocalStorage was read successfully`, savedData);
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
        savedData.interactions.filter(interaction => interaction.endAt > now).forEach(interaction => {
          dispatch((thunkDispatch:Dispatch) => {
            thunkDispatch(restoreInteractionFromSave(interaction))
            window.setTimeout(() => {
              thunkDispatch(removeInteractionEvent(interaction.id))
            }, interaction.endAt - now);
          })

        });

        if(savedData.config.lastSaved){
          console.log('send lastSaved', savedData.config.lastSaved)
          dispatch(pingStore({ time: savedData.config.lastSaved, doSave: true }));
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
  const [ appData, ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);

  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      readIt(dispatch, appData);
    }
  }, [ loaded, appData, setLoaded, dispatch ]);

  return (null);
}
