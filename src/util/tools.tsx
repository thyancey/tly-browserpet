import { PetStatDefinition, DeltaStat, SavedPetState, CachedPetStat } from '../types';

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

// in the future, if the needs to be accurate, it needs to be simulated per second
// and not totalled/clamped at the end
// for frequent updates and basic save/load this is fine
// future needs are for a "while you were gone" timeline and more accurate events
export const getRenderedDeltaStats = (stats: PetStatDefinition[], cachedPetStats: CachedPetStat[], oldSaveTime: number, newSaveTime: number) =>{
  const timeDiff = (newSaveTime - oldSaveTime) / 1000;
  // console.log('getRenderedDeltaStats timeDiff', timeDiff);
  // console.log('oldSaveTime', oldSaveTime);

  return stats.map(s => {
    const curValue = cachedPetStats.find(cS => cS.id === s.id)?.value || s.value;
    return {
      id: s.id,
      value: Math.round((clamp(curValue + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100,
      max: s.max,
      label: s.label
    }
  });
};

export const getSaveDeltaStats = (stats: PetStatDefinition[], cachedPetStats: CachedPetStat[], oldSaveTime: number, newSaveTime: number) =>{
  // if either are null, caching hasnt gotten set up yet, so just use the value you're given.
  const timeDiff = (newSaveTime && oldSaveTime) ? (newSaveTime - oldSaveTime) / 1000 : 0;
  // console.log('getSaveDeltaStats timeDiff', timeDiff);
  console.log(new Date(oldSaveTime).toTimeString(), new Date(newSaveTime).toTimeString());
  // console.log('now: ',  new Date().toTimeString());
  return stats.map(s => {
    const curValue = cachedPetStats.find(cS => cS.id === s.id)?.value || s.value;
    console.log('using', curValue, 'over ', s.value)
    return {
      id: s.id,
      value: Math.round((clamp(curValue + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100
    } as DeltaStat;
  });
};