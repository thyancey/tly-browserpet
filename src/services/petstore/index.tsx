// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import { PetDefinition, SavedPetState, LocalStorageState, PetLogicGroup, RawPetJSON, PetStatusDefinition, PetInfo, PetStatDefinition, PetBehaviorDefinition } from '../../types';
import { getDeltaStats } from '../../util/tools';
import { evaluateWhenThenNumberGroup, evaluateWhenThenStringGroup, parseRawWhenThenGroup } from '../../util/whenthen';

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
  return {
    stats: petDefJSON.logic.stats.map(pS => {
      const foundStat = initialState?.stats.find(iS => iS.id === pS.id);
      const statEffects = parseRawWhenThenGroup(pS.statEffects, 'stats');

      if(foundStat){
        return {
          ...pS,
          value: foundStat.value,
          statEffects: statEffects
        }
      }else{
        return {
          ...pS,
          statEffects: statEffects
        }
      }
    }),
    statuses: petDefJSON.logic.statuses || [],
    behaviorRules: parseRawWhenThenGroup(petDefJSON.logic.behaviorRules, 'statuses'),
    behaviors: petDefJSON.logic.behaviors || [],
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
  
        // const toSave = curStats.map(s => ({
        //   id: s.id,
        //   value: s.currentValue
        // }));

        savePl.pets.push({
          id: pet.id,
          stats: curStats,
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
      console.log('createPet', action.payload);
      
      const { petDefinition, initialState } = action.payload as CreatePetPayload;
      const foundPet = state.pets.find(p => p.id === petDefinition.id);
      const nowTime = new Date().getTime();
      const logicGroup = parseLogicGroup(petDefinition, initialState); 

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

export const selectActivePetInfo = createSelector(
  [selectActivePet],
  (activePet): (PetInfo | null) => {
    if(!activePet) return null;

    return {
      id: activePet.id,
      name: activePet.name,
      level: activePet.level,
      bio: activePet.bio
    };
  }
);

export const selectActiveDeltaStats = createSelector(
  [selectActivePet, selectPingIdx], 
  (activePet, pingIdx) => {
    // TODO: all the delta stat stuff
    if(!activePet || !activePet.logic.stats) return [];

    return getDeltaStats(activePet.logic.stats, activePet.timestamp, new Date().getTime());
  }
);

export const selectActivePetImage = createSelector(
  [selectActivePet], 
  (activePet) => {
    return activePet?.image || '';
  }
);

export const selectActiveStatDefinitions = createSelector(
  [selectActivePet], (activePet) => { return activePet?.logic?.stats || []; }
);
export const selectActiveStatusDefinitions = createSelector(
  [selectActivePet], (activePet) => { return activePet?.logic?.statuses || []; }
);
export const selectActiveBehaviorRuleDefinitions = createSelector(
  [selectActivePet], (activePet) => { return activePet?.logic?.behaviorRules || []; }
);
export const selectActiveBehaviorDefinitions = createSelector(
  [selectActivePet], (activePet) => { return activePet?.logic?.behaviors || []; }
);

export const selectActiveDeltaStatuses = createSelector(
  [selectActiveDeltaStats, selectActiveStatDefinitions], 
  (deltaStats, statDefinitions) => {
    // for each statDef, look through statDef.statEffects, which is a whenThenNumberGroup[]
    // all stats should be evaluated, and output all unique statuses matched
    const findDeltaStat = (id: string) => deltaStats.find(ds => ds.id === id);

    const allStatuses = [];
    for(let i = 0; i < statDefinitions.length; i++){
      const dS = findDeltaStat(statDefinitions[i].id);
      if(!dS) continue;

      for(let j = 0; j < statDefinitions[i].statEffects.length; j++){
        const status = evaluateWhenThenNumberGroup(statDefinitions[i].statEffects[j], dS.value, dS.max);
        if(status && allStatuses.indexOf(status) === -1){
          allStatuses.push(status);
        }
      }
    }
    return allStatuses.map((statusId, idx) => {
      return statusId
    }).reverse();
  }
);

export const selectDetailedActiveDeltaStatuses = createSelector(
  [selectActiveDeltaStatuses, selectActiveStatusDefinitions],
  (deltaStatIds, statusDefinitions): PetStatusDefinition[] => {
    return deltaStatIds.map(dId => {
      return statusDefinitions.find(sD => sD.id === dId) as PetStatusDefinition;
    }).filter(e => !!e);
  }
);

export const selectActiveBehavior = createSelector(
  [selectActiveDeltaStatuses, selectActiveBehaviorRuleDefinitions, selectActiveBehaviorDefinitions],
  (deltaStatusIds, behaviorRules, behaviorDefinitions): (PetBehaviorDefinition | null) => {
    for(let i = 0; i < behaviorRules.length; i++){
      let finalBehaviorId = evaluateWhenThenStringGroup(behaviorRules[i], deltaStatusIds);
      if(finalBehaviorId){
        const f = behaviorDefinitions.find(bD => bD.id === finalBehaviorId);
        if(!f){
          throw `ERROR: invalid behaviorId: "${finalBehaviorId}"`;
        }
        return f;
      }
    }
    return null;
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
