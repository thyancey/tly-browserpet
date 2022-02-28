// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetDefinition, SavedPetState, PetLogicGroup, RawPetJSON, PetStatusDefinition, PetInfo, PetBehaviorDefinition, PetStatDefinitionJSON, PetInteractionDefinition, StatChangeDefinition, PetInteractionDetail, LocalStorageState, ActiveInteractionStatus, DeltaStat, PetBehaviorJSON, CachedPetStat } from '../../types';
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
  interactions: ActiveInteractionStatus[],
  cachedPets: SavedPetState[],
  lastCached: number,
}

export type CreatePetPayload = {
  isActive: boolean,
  petDefinition: RawPetJSON,
  initialState: SavedPetState
}

const initialStoreState: PetStoreState = {
  activeIdx: -1,
  pets: [],
  interactions: [],
  cachedPets: [],
  lastCached: 0
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
    clearSave: (state: PetStoreState) => {
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
    setCachedPayload: (state: PetStoreState, action: PayloadAction<any>) => {
      const lss = action.payload as LocalStorageState;
      // console.log('setCached, localStorageState:', lss);
      if(lss.config.lastSaved !== state.lastCached){
        console.log('caching!', state.lastCached, lss.pets);
        state.lastCached = lss.config.lastSaved || 0;
        state.cachedPets = lss.pets.map(p => ({
          ...p,
          // lastSaved: p.id === lss.config.activePet ? p.lastSaved : new Date().getTime()
        }));
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

      // state.pets = state.pets.map((pD, idx) => {
      //   console.log(idx, state.activeIdx);
      //   if(idx === state.activeIdx){
      //     console.log(`__ ${state.pets[idx].id}`);
      //     return {
      //       ...state.pets[state.activeIdx],
      //       lastSaved: time,
      //       logic:{
      //         ...state.pets[state.activeIdx].logic,
      //         stats: state.pets[state.activeIdx].logic.stats.map(s => ({
      //           ...s,
      //           value: newStats.find(ns => ns.id === s.id)?.value || s.value
      //         }))
      //       }
      //     };
      //   }else{
      //     return {
      //       ...pD,
      //       lastSaved: time
      //     };
      //   }
      // });
      state.pets[state.activeIdx] = {
        ...state.pets[state.activeIdx],
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

      // state.
      // const lastSaved =  (savedData.config.activePet === petDef.id) ? (savedStatus?.lastSaved || new Date().getTime()) : new Date().getTime()
      
      const { petDefinition, initialState, isActive } = action.payload as CreatePetPayload;
      const foundPet = state.pets.find(p => p.id === petDefinition.id);
      const nowTime = new Date().getTime();
      // const nowTime = initialState?.lastSaved || new Date().getTime();
      const logicGroup = parseLogicGroup(petDefinition, initialState);

      const lastSaved = isActive ? (initialState?.lastSaved || nowTime) : nowTime;

      console.log(`\n createPet: ${petDefinition.id}, isActive? ${isActive}`);
      if(!initialState){
        console.log('no initial state found.')
      }else{
        console.log('initial state:', initialState);
      }
      console.log(`for ${petDefinition.id}, lastSaved: ${lastSaved}`)
      console.log(`for ${petDefinition.id}, lastSaved: ${new Date(lastSaved).toTimeString()}`)

      const updatedDef = {
        ...petDefinition,
        logic: logicGroup,
        bornOn: initialState?.bornOn || new Date().getTime(),
        lastSaved: lastSaved
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

      // restore it to the cache if it was saved!
      if(initialState){
        if(!state.cachedPets.find(cP => cP.id === initialState?.id)){
          state.cachedPets = [...state.cachedPets, ...[{
            ...initialState,
            lastSaved: lastSaved
          }]]
        }
      }

      // TODO: man, this is confusing. But to keep the "active" as the only thing that changed, this
      // sets the comparison time on load
      if(isActive){
        state.lastCached = lastSaved
      }
    }
  }
});

export const { createPet, setActiveIdx, setActiveId, clearSave, setCachedPayload, addInteractionEvent, restoreInteractionFromSave, changeStatEvent, removeInteractionEvent } = petStoreSlice.actions;

export const selectActiveIdx = (state: RootState): number => state.petStore.activeIdx;
export const selectPets = (state: RootState): PetDefinition[] => state.petStore.pets;
export const getActiveInteractions = (state: RootState): ActiveInteractionStatus[] => state.petStore.interactions;
export const getCachedPets = (state: RootState): SavedPetState[] => state.petStore.cachedPets;
export const getLastCached = (state: RootState): number => state.petStore.lastCached;
export const selectLastCached = createSelector(
  [getLastCached], (lastCached) => lastCached
);

export const selectActivePet = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => {
    return pets[activeIdx] || null;
  }
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
export const selectCachedPets = createSelector(
  [getCachedPets], (cachedPets) => cachedPets
);
export const selectCachedPetStats = createSelector(
  [getCachedPets], (cachedPets) => cachedPets.map(cp => cp.stats)
);
export const selectActiveCachedPetStats = createSelector(
  [getCachedPets, selectActivePet],
  (cachedPets, activePet): CachedPetStat[] => {
    console.log('>>>> activePet is ', activePet?.id)
    if(!activePet) return [];
    return cachedPets.find(cP => cP.id === activePet.id)?.stats || [];
  }
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
  [selectActiveStatDefinitions, selectActiveCachedPetStats, selectLastCached, selectLastRendered], 
  (petStatus, cachedStats, petTime, time) => {
    return getRenderedDeltaStats(petStatus, cachedStats, petTime, time);
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
  [selectActiveStatDefinitions, selectActiveCachedPetStats, selectLastCached, selectLastSaved], 
  (petStats, cachedPetStats, lastCachedTime, lastSavedTime) => {
    if(!lastCachedTime) console.error('selectSavedDeltaStats, LAST CACHE')
    if(!lastSavedTime) console.error('selectSavedDeltaStats, LAST SAVED')
    return getSaveDeltaStats(petStats, cachedPetStats, lastCachedTime, lastSavedTime);
  }
);

export const getFromLocalStorage = () => {
  try{
    return JSON.parse((global as any).localStorage.getItem('browserpet'));
  }catch(e){
    console.log('no localStorage entry found for "browserpet"');
    return null;
  }
}
export const getPetsFromLocalStorage = () => {
  try{
    return getFromLocalStorage().pets;
  } catch(e){
    return [];
  }
}


export const selectPetsFromLocalStorage = createSelector(
  [getPetsFromLocalStorage], (pets: SavedPetState[]) => pets
);

export const selectNewSavePayload = createSelector(
  [selectLastSaved, selectLastCached, selectSavedDeltaStats, selectActivePet, selectActiveInteractionStatus, selectCachedPets],
  (lastSaved, lastCached, deltaStats, activePet, activeInteractions, storedPets): (LocalStorageState | null) => {
    console.log('from savedPets', storedPets);
    console.log('from deltaStats', deltaStats);

    console.log('\nTIMEDIFF: ', lastCached - lastSaved);

    if(!activePet){
      return DEFAULT_LOCALSTORAGE_STATE;
    }
    if(lastCached - lastSaved === 0) {
      // avoids a double save condition
      return null;
    }
    
    const foundIdx = storedPets.findIndex((sP: SavedPetState) => sP.id === activePet.id);
    let newList = [];
    if(foundIdx > -1){
      // console.log('>>>> FOUND', storedPets.length)
      newList = storedPets.map((sP: SavedPetState) => {
        if(sP.id === activePet.id){
          // console.log('match, new', activePet.id)
          return {
            id: activePet.id,
            stats: deltaStats,
            bornOn: activePet.bornOn,
            // lastSaved: sP.lastSaved // active pets should not update this value, so they stay active in the background
            lastSaved: lastSaved // active pets should not update this value, so they stay active in the background
          }
        }

        return {
          ...sP,
          lastSaved: lastSaved
        }
      })
    }else{
      console.log('>>>> ADDING')
      newList = storedPets.concat([{
        id: activePet.id,
        stats: deltaStats,
        bornOn: activePet.bornOn,
        lastSaved: lastSaved
      }]);
    }

    console.log('... savin', newList)
    
    return {
      config:{
        activePet: activePet?.id || '',
        lastSaved: lastSaved
      },
      interactions:activeInteractions,
      pets:newList
    };
  }
);


export default petStoreSlice.reducer;
