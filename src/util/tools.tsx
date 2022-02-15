export const round = (number:number, pad?:number) => {
  if(!pad) return Math.round(number);
  
  const rounder = Math.pow(10, pad);
  return Math.round(number * rounder) / rounder;
}

export const clamp = (val:number, min:number, max:number) => {
  return Math.min(Math.max(val, min), max);
}

export const randBetween = (range:number[]) => {
  return range[0] + (Math.random() * (range[1] - range[0]));
}