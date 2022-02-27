// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import { PetDefinition, SavedPetState, LocalStorageState, PetLogicGroup, RawPetJSON, PetStatusDefinition, PetInfo, PetStatDefinition, PetBehaviorDefinition, RawPetStatDefinition, PetInteractionDefinition, PetStatEffectDefinition, PetInteractionDetail, NewLocalStorageState } from '../../types';
import { getDeltaStats, getSaveDeltaStats } from '../../util/tools';
import { evaluateWhenThenNumberGroup, evaluateWhenThenStringGroup, parseRawWhenThenGroup } from '../../util/whenthen';

import { RootState } from '../store';
import { selectActiveInteractionStatus, selectActiveStatEffects, selectLastSaved, selectLastRendered } from '../ui';

const DEFAULT_LOCALSTORAGE_STATE: NewLocalStorageState = {
  config:{
    activePet: '',
    lastSaved: -1
  },
  interactions:[],
  pets:[]
};

export type PetStoreState = {
  activeIdx: number,
  pets: PetDefinition[],
  lastSaved: number,
  lastSavedPayload: LocalStorageState
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
  lastSavedPayload: DEFAULT_LOCALSTORAGE_STATE
};

// might want to do some validation and pre-processing here
export const parseLogicGroup = (petDefJSON: RawPetJSON, initialState: SavedPetState) => {
  return {
    stats: parseStatsGroup(petDefJSON.logic.stats, initialState),
    statuses: petDefJSON.logic.statuses || [],
    behaviorRules: parseRawWhenThenGroup(petDefJSON.logic.behaviorRules, 'statuses'),
    behaviors: petDefJSON.logic.behaviors || [],
    interactions: parseInteractionsGroup(petDefJSON.logic.interactions, initialState),
  } as PetLogicGroup;
};

// could do some validation here
export const parseStatEffects = (statEffectsJSON: PetStatEffectDefinition[]) => {
  return statEffectsJSON.map(sE => ({
    statId: sE.statId,
    oneHit: sE.oneHit || 0,
    perSecond: sE.perSecond || 0,
    duration: sE.duration || 0,
    delay: sE.delay || 0
  }));
}

export const parseInteractionsGroup = (interactions: PetInteractionDefinition[], initialState: SavedPetState) => {
  if(!interactions) return [];

  return interactions.map(int => (
    {
      id: int.id,
      label: int.label,
      cooldown: int.cooldown,
      statEffects: parseStatEffects(int.statEffects)
    }
  ));
};

export const parseStatsGroup = (statsDef: RawPetStatDefinition[], initialState: SavedPetState) => {
  return statsDef.map(pS => {
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
  });
};

export const petStoreSlice = createSlice({
  name: 'petStore',
  initialState: initialStoreState,
  reducers: {
    triggerSave: (state: PetStoreState, action: PayloadAction<any>) => {
      const ts = action.payload;
      console.log('triggerSave');

      state.lastSaved = ts;
    },
    setLastSavedPayload: (state: PetStoreState, action: PayloadAction<any>) => {
      console.log('setLastSavedPayload');

      state.lastSavedPayload = action.payload;
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
      console.log('INTIIAL STATE', initialState)

      const updatedDef = {
        ...petDefinition,
        logic: logicGroup,
        bornOn: initialState?.bornOn || new Date().getTime(),
        // timestamp: nowTime
        timestamp: initialState?.lastSaved ? initialState.lastSaved : nowTime
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

export const { createPet, setActiveIdx, setActiveId, triggerSave, clearSave, setLastSavedPayload } = petStoreSlice.actions;

export const selectActiveIdx = (state: RootState): number => state.petStore.activeIdx;
export const selectPets = (state: RootState): PetDefinition[] => state.petStore.pets;

export const selectActivePet = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => {
    return pets[activeIdx];
  }
);
export const selectActiveTime = createSelector(
  [selectActivePet], (activePet) => activePet?.timestamp || 0
);
export const selectActiveImage = createSelector(
  [selectActivePet], (activePet) => activePet?.image || ''
);
export const selectActiveStatDefinitions = createSelector(
  [selectActivePet], (activePet) => activePet?.logic?.stats || []
);
export const selectActiveStatusDefinitions = createSelector(
  [selectActivePet], (activePet) => activePet?.logic?.statuses || []
);
export const selectActiveInteractionDefinitions = createSelector(
  [selectActivePet], (activePet) => activePet?.logic?.interactions || []
);
export const selectActiveBehaviorRuleDefinitions = createSelector(
  [selectActivePet], (activePet) => activePet?.logic?.behaviorRules || []
);
export const selectActiveBehaviorDefinitions = createSelector(
  [selectActivePet], (activePet) => activePet?.logic?.behaviors || []
);

export const selectActiveInfo = createSelector(
  [selectActivePet],
  (activePet): (PetInfo | null) => {
    if(!activePet) return null;

    return {
      id: activePet.id,
      name: activePet.name,
      level: activePet.level,
      bio: activePet.bio,
      bornOn: activePet.bornOn
    };
  }
);

export const selectActiveDeltaStats = createSelector(
  [selectActiveStatDefinitions, selectActiveStatEffects, selectActiveTime, selectLastRendered], 
  (petStatus, statEffects, petTime, time) => {
    return getDeltaStats(petStatus, statEffects, petTime, time);
  }
);

export const selectActiveInteractionDetail = createSelector(
  [selectActiveInteractionDefinitions, selectActiveInteractionStatus], 
  (activeInteractionDefinitions, activeInteractions): PetInteractionDetail[] => { 
    return activeInteractionDefinitions.map(iD => {
      return {
        id:iD.id,
        label: iD.label,
        startAt: activeInteractions.find(aI => aI.id === iD.id)?.startAt || 0,
        endAt: activeInteractions.find(aI => aI.id === iD.id)?.endAt || 0
      } as PetInteractionDetail
    }); 
  }
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



/*
const ts = action.payload;

const savePl: LocalStorageState = {
  config:{
    activePet: state.pets[state.activeIdx]?.id || ''
  },
  pets:[]
};

state.pets.forEach(pet => {
  const curStats = getDeltaStats(pet.logic.stats, [], pet.timestamp, ts);
  savePl.pets.push({
    id: pet.id,
    stats: curStats,
    bornOn: pet.bornOn,
    lastSaved: ts
  })
});*/


export const selectSavedDeltaStats = createSelector(
  [selectActiveStatDefinitions, selectActiveTime, selectLastSaved], 
  (petStatus, petTime, lastSavedTime) => {
    return getSaveDeltaStats(petStatus, petTime, lastSavedTime);
  }
);

// export const selectNewSavePayload = createSelector(
//   [selectLastSaved, selectSavedDeltaStats, selectActivePet, selectActiveInteractionStatus],
//   (lastSaved, deltaStats, activePet, activeInteractions): NewLocalStorageState => {
//     console.log('lastSaved', lastSaved)
//     if(!activePet){
//       return DEFAULT_LOCALSTORAGE_STATE;
//     }
//     return {
//       config:{
//         activePet: activePet?.id || '',
//         lastSaved: lastSaved
//       },
//       interactions:activeInteractions,
//       pets:[{
//         id: activePet.id,
//         stats: deltaStats,
//         bornOn: activePet.bornOn,
//         lastSaved: lastSaved
//       }]
//     };
//   }
// );

export const selectNewSavePayload = createSelector(
  [selectLastSaved, selectSavedDeltaStats, selectActivePet, selectActiveInteractionStatus],
  (lastSaved, deltaStats, activePet, activeInteractions): NewLocalStorageState => {
    console.log('activeInteractions', activeInteractions)
    if(!activePet){
      return DEFAULT_LOCALSTORAGE_STATE;
    }
    return {
      config:{
        activePet: activePet?.id || '',
        lastSaved: lastSaved
      },
      interactions:activeInteractions,
      pets:[{
        id: activePet.id,
        stats: deltaStats,
        bornOn: activePet.bornOn,
        lastSaved: lastSaved
      }]
    };
  }
);


export default petStoreSlice.reducer;
