import { useEffect, useState } from 'react';
import { jsonc } from 'jsonc';

import { LocalStorageState, PetManifestEntry, RawPetJSON } from '../../types';
import useLocalStorage from '../../util/hooks/useLocalStorage';
import { createPet, removeInteractionEvent, restoreInteractionFromSave, setActiveId, setActiveIdx } from '../../services/petstore';
import { DEFAULT_LOCALSTORAGE_STATE } from '../../services/store';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';


const fetchAllData = async (url: string, dispatch: any, savedData: LocalStorageState) => {
  console.log('\n\n\n');
  console.log('-------fetchAllData----------');
  const pets = await readManifest(url)
  console.log('fetchAllData: received pets', pets);

  const parsedPets = await fetchPetFiles(pets)
  console.log('fetchAllData: received parsedPets', parsedPets);

  finishUp(parsedPets, dispatch, savedData)

  console.log('\n\n\n');
}

const readManifest = async (url: string) => {
  console.log(`readManifest: reading manifest from ${url}`);
  const petsList = await fetchManifest(url).then(json => {
    console.log('readManifest: fetched:', json);
    return json.pets.map((p:any) => ({
      id: p.id,
      baseUrl: p.baseUrl
    }));
  });

  console.log('readManifest: returning', petsList);
  return petsList;
}

const fetchManifest = async (url: string) => {
  try{
    const response = await fetch(url, { mode: 'cors'});
    if(!response.ok){
      throw `bad response`;
    }
    
    const text = await response.text();
    return jsonc.parse(text);
  } catch(e){
    console.error(`Error fetching or parsing manifest from ${url}`, e);
    return {};
  }
}

const fetchPetFiles = async (petFiles: PetManifestEntry[]) => {
  let promises = [] as Promise<RawPetJSON>[];
  petFiles.forEach(pF => promises.push(getPetPromise(pF)));
  const result = await Promise.all(promises);
  return result
}

const getPetPromise = (petFile: PetManifestEntry): Promise<RawPetJSON> => {
  return new Promise(resolve => resolve(fetchPetFile(petFile)));
}

const fetchPetFile = async (petManifestEntry: PetManifestEntry) => {
  const url = petManifestEntry.baseUrl + '/data.jsonc';
  try{
    const response = await fetch(url, { mode: 'cors'});
    if(!response.ok){
      throw `bad response`;
    }
    const petJson = jsonc.parse(await response.text());
    petJson.baseUrl = petManifestEntry.baseUrl;
    
    return petJson;
  } catch(e){
    console.error(`Error fetching or parsing pet manifest from ${url}`, e);
    return {};
  }
}

const finishUp = (parsedPets: RawPetJSON[], dispatch: any, savedData: LocalStorageState) => {
  const now = new Date().getTime();
  console.log('>>> FINISH UP')
  console.log(`JSON definitions parsed successfully`, parsedPets);
  console.log(`LocalStorage was read successfully`, savedData);
  let activeId = '';
  
  if(savedData.config.activePet){
    activeId = savedData.config.activePet;
  }


  parsedPets.forEach((petDef: RawPetJSON) => {
    const savedStatus = savedData?.pets.find(p => p.id === petDef.id) || null;
    if(!activeId && savedStatus && savedData.config.activePet === savedStatus.id){
      activeId = savedStatus.id;
    }
    dispatch(createPet({
      isActive: (activeId === savedStatus?.id),
      petDefinition: petDef,
      initialState: savedStatus
    }));
  });

  if(activeId){
    dispatch(setActiveId(activeId));
  }else{
    dispatch(setActiveIdx(0));
  }

  savedData.interactions.filter(interaction => interaction.endAt > now).forEach(interaction => {
    dispatch((thunkDispatch:Dispatch) => {
      thunkDispatch(restoreInteractionFromSave(interaction))
      window.setTimeout(() => {
        thunkDispatch(removeInteractionEvent(interaction.id))
      }, interaction.endAt - now);
    });
  });

  // dispatch(pingStore({ time: now, doSave: true }));
}

export const Loader = () => {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const [ savedData, ] = useLocalStorage('browserpet', DEFAULT_LOCALSTORAGE_STATE);

  useEffect(() => {
    if(!loaded){
      setLoaded(true);
      fetchAllData(`assets/pet-manifest.jsonc`, dispatch, savedData);
    }
  }, [ loaded, savedData, setLoaded, dispatch ]);

  return (null);
}
