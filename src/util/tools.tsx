import { PetStatDefinition, DeltaStat } from '../types';

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
export const getRenderedDeltaStats = (stats: PetStatDefinition[], prevTime: number, nowTime: number) =>{
  const timeDiff = (nowTime - prevTime) / 1000;

  return stats.map(s => ({
    id: s.id,
    value: Math.round((clamp(s.value + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100,
    max: s.max,
    label: s.label
  }));
};

export const getSaveDeltaStats = (stats: PetStatDefinition[], oldSaveTime: number, newSaveTime: number) =>{
  const timeDiff = (newSaveTime - oldSaveTime) / 1000;

  return stats.map(s => {
    return {
      id: s.id,
      value: Math.round((clamp(s.value + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100
    } as DeltaStat;
  });
};