import { PetStatDefinition, DeltaStat, CachedPetStat } from '../types';

// general
export const round = (number:number, pad?:number) => {
  if(!pad) return Math.round(number);
  
  const rounder = Math.pow(10, pad);
  return Math.round(number * rounder) / rounder;
};

export const clamp = (val:number, min:number, max:number) => {
  return Math.min(Math.max(val, min), max);
};

export const randBetween = (range:number[]) => {
  return range[0] + (Math.random() * (range[1] - range[0]));
};

export const getStatValue = (s: PetStatDefinition, cachedPetStats: CachedPetStat[], timeDiff: number, forceCurrent?: boolean) => {
  let curValue = cachedPetStats.find(cS => cS.id === s.id)?.value;
  if(curValue === undefined){
    curValue = s.value;
  }

  if(forceCurrent) return curValue; // from invalid time supplied, dont calculate
  return Math.round((clamp(curValue + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100
}

export const getRenderedDeltaStats = (stats: PetStatDefinition[], cachedPetStats: CachedPetStat[], oldSaveTime: number, newSaveTime: number) =>{
  const timeDiff = (newSaveTime - oldSaveTime) / 1000;
  /*
    TODO, this could get removed simplified after resolving:
    - redundant call on save
    - negative time on change pet between saves
  */

  if(timeDiff <= 0){
    return stats.map(s => {
      return {
        id: s.id,
        value: getStatValue(s, cachedPetStats, timeDiff, true),
        max: s.max,
        label: s.label
      }
    });
  }

  return stats.map(s => {
    return {
      id: s.id,
      value: getStatValue(s, cachedPetStats, timeDiff),
      max: s.max,
      label: s.label
    }
  });
};

export const getCachedDeltaStats = (stats: PetStatDefinition[], cachedPetStats: CachedPetStat[], oldSaveTime: number, newSaveTime: number) =>{
  const timeDiff = (newSaveTime && oldSaveTime) ? (newSaveTime - oldSaveTime) / 1000 : 0;
  return stats.map(s => {
    return {
      id: s.id,
      value: getStatValue(s, cachedPetStats, timeDiff)
    } as DeltaStat;
  });
};

const LOG = false;
export const log = (...messages:any) => {
  LOG && console.log(...messages);
}

export const ensureArray = (thing: any): any[] => {
  return Array.isArray(thing) ? thing : [ thing ];
}