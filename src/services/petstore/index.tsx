// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetDefinition, SavedPetState, PetLogicGroup, RawPetJSON, PetStatusDefinition, PetInfo, PetBehaviorDefinition, PetStatDefinitionJSON, PetInteractionDefinition, StatChangeDefinition, PetInteractionDetail, LocalStorageState, ActiveInteractionStatus, DeltaStat, PetBehaviorJSON } from '../../types';
import { clamp, getRenderedDeltaStats, getSaveDeltaStats } from '../../util/tools';
import { evaluateWhenThenNumberGroup, evaluateWhenThenStringGroup, parseRawWhenThenGroup } from '../../util/whenthen';

import { RootState } from '../store';
import { selectLastSaved, selectLastRendered } from '../ui';

const DEFAULT_LOCALSTORAGE_STATE: LocalStorageState = {
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
  interactions: ActiveInteractionStatus[]
}

export type CreatePetPayload = {
  petDefinition: RawPetJSON,
  initialState: SavedPetState
}

const initialStoreState: PetStoreState = {
  activeIdx: 0,
  pets: [],
  interactions: []
};

// might want to do some validation and pre-processing here
export const parseLogicGroup = (petDefJSON: RawPetJSON, initialState: SavedPetState) => {
  return {
    stats: parseStatsGroup(petDefJSON.logic.stats, initialState),
    statuses: petDefJSON.logic.statuses || [],
    behaviorRules: parseRawWhenThenGroup(petDefJSON.logic.behaviorRules, 'statuses'),
    behaviors: parsePetBehaviors(petDefJSON.logic.behaviors || [], petDefJSON.baseUrl),
    interactions: parseInteractionsGroup(petDefJSON.logic.interactions, initialState),
  } as PetLogicGroup;
};

export const parsePetBehaviors = (petBehaviorsJson: PetBehaviorJSON[], baseUrl: string) => {
  return petBehaviorsJson.map(pB => ({
    ...pB,
    imageUrl: pB.image ? `${baseUrl}/${pB.image}` : pB.imageUrl || ''
  }))
}

// could do some validation here
export const parseStatChanges = (statChangesJSON: StatChangeDefinition[] = []) => {
  return statChangesJSON.map(sE => ({
    statId: sE.statId,
    value: sE.value || 0
  }));
}

export const parseInteractionsGroup = (interactions: PetInteractionDefinition[], initialState: SavedPetState) => {
  if(!interactions) return [];

  return interactions.map(int => (
    {
      id: int.id,
      label: int.label,
      cooldown: int.cooldown,
      changeStats: parseStatChanges(int.changeStats)
    }
  ));
};

export const parseStatsGroup = (statsDef: PetStatDefinitionJSON[], initialState: SavedPetState) => {
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
    clearSave: () => {
      // TODO, this should be handled differently, or taken out of redux otherwise
      (global as any).localStorage.clear();
      (global as any).location.reload();
    },
    setActiveId: (state: PetStoreState, action: PayloadAction<any>) => {
      const petIdx = state.pets.findIndex((p:PetDefinition) => p.id === action.payload);
      if(petIdx === -1){
        console.log(`Cannot find pet with id "${action.payload}"`);
      }else{
        state.activeIdx = petIdx;
      }
    },
    setActiveIdx: (state: PetStoreState, action: PayloadAction<any>) => {
      state.activeIdx = action.payload;
    },
    restoreInteractionFromSave:  (state: PetStoreState, action: PayloadAction<any>) => {
      const interaction = action.payload as ActiveInteractionStatus;
      if(!state.interactions.find(iE => iE.id === interaction.id)){
        console.log(`restoreInteractionFromSave ${interaction.id} with ${(interaction.endAt - new Date().getTime()) / 1000} secs left`);
        state.interactions.push(interaction);
      }
    },
    addInteractionEvent: (state: PetStoreState, action: PayloadAction<any>) => {
      const { interaction, time } = action.payload as {
        interaction: PetInteractionDefinition,
        time: number
      };

      // no need to save it if its immediate
      if(!interaction.cooldown){
        return;
      }
      
      // // these are added by a user interaction
      if(!state.interactions.find(iE => iE.id === interaction.id)){
        state.interactions.push({
          id: interaction.id,
          startAt: time,
          endAt: time + (interaction.cooldown || 0)
        });
      }
    },
    changeStatEvent: (state: PetStoreState, action: PayloadAction<any>) => {
      const { changedStats, time, activeStats } = action.payload as {
        changedStats: StatChangeDefinition[],
        time: number,
        activeStats: DeltaStat[]
      };
      
      // // these are added by a user interaction

      const newStats = activeStats.map(stat => {
        const toChange = changedStats.find(cStat => cStat.statId === stat.id);
        if(toChange){
          return {
            ...stat,
            value: clamp(stat.value + toChange.value, 0, stat.max)
          };
        }
        return stat;
      });

      state.pets[state.activeIdx] = {
        ...state.pets[state.activeIdx],
        timestamp: time,
        logic:{
          ...state.pets[state.activeIdx].logic,
          stats: state.pets[state.activeIdx].logic.stats.map(s => ({
            ...s,
            value: newStats.find(ns => ns.id === s.id)?.value || s.value
          }))
        }
      }
    },
    removeInteractionEvent: (state: PetStoreState, action: PayloadAction<any>) => {
      const intId = action.payload as string;
      
      state.interactions = state.interactions.filter(interaction => interaction.id !== intId);
    },
    createPet: (state: PetStoreState, action: PayloadAction<any>) => {
      console.log('createPet', action.payload);
      
      const { petDefinition, initialState } = action.payload as CreatePetPayload;
      const foundPet = state.pets.find(p => p.id === petDefinition.id);
      const nowTime = initialState?.lastSaved || new Date().getTime();
      const logicGroup = parseLogicGroup(petDefinition, initialState); 

      const updatedDef = {
        ...petDefinition,
        logic: logicGroup,
        bornOn: initialState?.bornOn || new Date().getTime(),
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

export const { createPet, setActiveIdx, setActiveId, clearSave, addInteractionEvent, restoreInteractionFromSave, changeStatEvent, removeInteractionEvent } = petStoreSlice.actions;

export const selectActiveIdx = (state: RootState): number => state.petStore.activeIdx;
export const selectPets = (state: RootState): PetDefinition[] => state.petStore.pets;
export const getActiveInteractions = (state: RootState): ActiveInteractionStatus[] => state.petStore.interactions;

export const selectActivePet = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => {
    return pets[activeIdx];
  }
);
export const selectActiveTime = createSelector(
  [selectActivePet], (activePet) => activePet?.timestamp || 0
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


export const selectActiveInteractionStatus = createSelector(
  [getActiveInteractions], (activeInteractions:ActiveInteractionStatus[]) => activeInteractions
);


export const selectActiveDeltaStats = createSelector(
  [selectActiveStatDefinitions, selectActiveTime, selectLastRendered], 
  (petStatus, petTime, time) => {
    return getRenderedDeltaStats(petStatus, petTime, time);
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
          console.log(`ERROR: invalid behaviorId: "${finalBehaviorId}"`);
          return null;
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

export const selectSavedDeltaStats = createSelector(
  [selectActiveStatDefinitions, selectActiveTime, selectLastSaved], 
  (petStatus, petTime, lastSavedTime) => {
    return getSaveDeltaStats(petStatus, petTime, lastSavedTime);
  }
);



export const selectNewSavePayload = createSelector(
  [selectLastSaved, selectSavedDeltaStats, selectActivePet, selectActiveInteractionStatus],
  (lastSaved, deltaStats, activePet, activeInteractions): LocalStorageState => {

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
