import { PetStatDefinition, DeltaStat, ActiveStatEffect } from '../types';

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

export const getStatEffectDeltaInTimeRange = (statEffects: ActiveStatEffect[], startTime:number, endTime:number) => {
  return statEffects.reduce((eps, aSE) => {
    const eStart = startTime > aSE.startAt ? startTime : aSE.startAt;
    const eEnd = endTime > aSE.endAt ? aSE.endAt : endTime;
    const eDiff = eEnd - eStart;
    if(eDiff > 0){
      return eps + (aSE.perSecond * (eDiff/1000))
    }else{
      return eps
    }
  }, 0);
}

// in the future, if the needs to be accurate, it needs to be simulated per second
// and not totalled/clamped at the end
// for frequent updates and basic save/load this is fine
// future needs are for a "while you were gone" timeline and more accurate events
export const getDeltaStats = (stats: PetStatDefinition[], activeStatEffects: ActiveStatEffect[], prevTime: number, nowTime: number) =>{
  const timeDiff = (nowTime - prevTime) / 1000;

  return stats.map(s => {
    const statEffectsChange = getStatEffectDeltaInTimeRange(activeStatEffects.filter(aSE => aSE.statId === s.id), prevTime, nowTime);
    
    return {
      id: s.id,
      value: Math.round((clamp(s.value + statEffectsChange + (s.perSecond * timeDiff), 0, s.max)) * 100) / 100,
      max: s.max,
      label: s.label
    } as DeltaStat;
  });
};