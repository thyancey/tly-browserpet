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



// app specific
export const getDeltaStats = (stats: PetStatDefinition[], prevTime: number, nowTime: number) =>{
  const timeDiff = (nowTime - prevTime) / 1000;

  return stats.map(s => {
    return {
      id: s.id,
      value: Math.round(clamp(s.value + (s.perSecond * timeDiff), 0, s.max)),
      max: s.max,
      label: s.label
    } as DeltaStat;
  });
};