// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetDefinition, SavedPetState, LocalStorageState, PetLogicGroup, RawPetJSON } from '../../types';
import { getDeltaStats } from '../../util/tools';

import { RootState } from '../store';
import { selectPingIdx } from '../ui';

export type PetStoreState = {
  activeIdx: number,
  pets: PetDefinition[],
  lastSaved: number,
  savePayload: LocalStorageState
}

export type CreatePetPayload = {
  petDefinition: RawPetJSON,
  initialState: SavedPetState
}

const initialStoreState: PetStoreState = {
  activeIdx: 0,
  pets: [],
  lastSaved: 0,
  // although this savePayload seems strange in the store, since the stats are changing CONSTANTLY, using a normal selector
  // isnt performant. If I can figure out a way to only reselect when something elses, perhaps this could get removed and 
  // immediately derived from the existing pets[]
  savePayload: {
    config:{
      activePet: ''
    },
    pets:[]
  }
};

// might want to do some validation and pre-processing here
export const parseLogicGroup = (petDefJSON: RawPetJSON, initialState: SavedPetState) => {
  console.log('parseLogicGroup', petDefJSON, initialState)

  return {
    stats: petDefJSON.logic.stats.map(pS => {
      const foundStat = initialState?.stats.find(iS => iS.id === pS.id);
      if(foundStat){
        return {
          ...pS,
          value: foundStat.value
        }
      }else{
        return pS
      }
    }),
    statuses: petDefJSON.logic.statuses || [],
    behaviorRules:petDefJSON.logic.behaviorRules || [],
    behaviors:petDefJSON.logic.behaviors || [],
  } as PetLogicGroup;
}

export const petStoreSlice = createSlice({
  name: 'petStore',
  initialState: initialStoreState,
  reducers: {
    triggerSave: (state: PetStoreState) => {
      const ts = new Date().getTime();

      const savePl: LocalStorageState = {
        config:{
          activePet: state.pets[state.activeIdx]?.id || ''
        },
        pets:[]
      };

      state.pets.forEach(pet => {
        const curStats = getDeltaStats(pet.logic.stats, pet.timestamp, ts);
  
        const toSave = curStats.map(s => ({
          id: s.id,
          value: s.currentValue
        }));

        savePl.pets.push({
          id: pet.id,
          stats: toSave,
          lastSaved: ts
        });
      });

      state.lastSaved = ts;
      state.savePayload = savePl;
    },
    clearSave: () => {
      // TODO, this should be handled differently, or taken out of redux otherwise
      (global as any).localStorage.clear();
      (global as any).location.reload();
    },
    setActiveId: (state: PetStoreState, action: PayloadAction<any>) => {
      const petIdx = state.pets.findIndex((p:PetDefinition) => p.id === action.payload);
      if(petIdx === -1){
        throw `Cannot find pet with id "${action.payload}"`;
      }
      state.activeIdx = petIdx;
    },
    setActiveIdx: (state: PetStoreState, action: PayloadAction<any>) => {
      state.activeIdx = action.payload;
    },
    createPet: (state: PetStoreState, action: PayloadAction<any>) => {
      console.log('createPet', action.payload)
      const { petDefinition, initialState } = action.payload as CreatePetPayload;
      const foundPet = state.pets.find(p => p.id === petDefinition.id);
      const nowTime = new Date().getTime();

      console.log('initialState', initialState)
      const logicGroup = parseLogicGroup(petDefinition, initialState); 
      console.log('logicGroup', logicGroup)

      const updatedDef = {
        ...petDefinition,
        logic: logicGroup,
        timestamp: nowTime
      } as PetDefinition;

      if(foundPet){
        state.pets = state.pets.map(p => {
          if(p.id === petDefinition.id){
            return updatedDef;
          }else{
            return p;
          }
        });
      }else{
        state.pets.push(updatedDef);
      }
    }
  }
});

export const { createPet, setActiveIdx, setActiveId, triggerSave, clearSave } = petStoreSlice.actions;

export const selectActiveIdx = (state: RootState): number => {
  return state.petStore.activeIdx;
};

export const selectPets = (state: RootState): PetDefinition[] => {
  return state.petStore.pets;
};

export const selectLastSaved = (state: RootState): number => {
  return state.petStore.lastSaved;
};

export const selectSavePayload = (state: RootState): LocalStorageState => {
  return state.petStore.savePayload;
};

export const selectAltSavePayload = (state: RootState): LocalStorageState => {
  return state.petStore.savePayload;
};

export const selectActivePet = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => {
    return pets[activeIdx];
  }
);

export const selectActivePetStats = createSelector(
  [selectActivePet, selectPingIdx], 
  (activePet, pingIdx) => {
    // TODO: all the delta stat stuff
    if(!activePet || !activePet.logic.stats) return [];

    return getDeltaStats(activePet.logic.stats, activePet.timestamp, new Date().getTime());
  }
);

export const selectPetList = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => pets.map((p, idx) => ({
    name: p.name,
    id: p.id,
    isActive: idx === activeIdx
  }))
);



export default petStoreSlice.reducer;
