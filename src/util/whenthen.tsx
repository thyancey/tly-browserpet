import { RawWhenThen, WhenNumber, WhenThenNumber, WhenThenString } from '../types';


export const evaluateWhenThenNumberGroup = (whenThenGroup: WhenThenNumber[], exact: number, percent:number) => {
  return 'SOME_STATUS';
} 
// export type WhenThen = {
//   when: string[] | WhenNumber[],
//   then: string
// }

export const parseRawWhenThenGroup = (rawWhenThenGroup: RawWhenThen[], type: 'stats' | 'statuses') => {
  if(type === 'statuses'){
    return rawWhenThenGroup.map(rwt => {
      // json should support string or array, make this better
      const whens = typeof rwt.when === 'string' ? [ rwt.when ] : rwt.when;
      return {
        when: whens,
        then: rwt.then
      } as WhenThenString;
    }) as WhenThenString[];
  } else if (type === 'stats'){
    if(!rawWhenThenGroup) return [] as WhenThenNumber[];
    return rawWhenThenGroup.map(rwt => {
      // json should support string or array, make this better
      const whens = typeof rwt.when === 'string' ? [ rwt.when ] : rwt.when;
      return {
        when: whens.map(w => parseExpressionString(w)).filter(w => w !== null),
        then: rwt.then
      } as WhenThenNumber;
    }) as WhenThenNumber[];
  }
  return [] as WhenThenNumber[];
};

/*
  //- convert <=_20% into:
  {
    condition: '<=',
    criteria: '20',
    isPercent: true
  }
*/
export const parseExpressionString = (expressionString: string) => {
  try{
    const valueTokens = expressionString.split('_');
    const condition = valueTokens[0];
    const valueCriteria = valueTokens[1];
    const percentageSplit = valueCriteria.split('%');
  
    return {
      condition: condition,
      criteria: Number(percentageSplit[0]),
      isPercent: percentageSplit.length > 1,
      direction: getConditionDirection(condition)
    } as WhenNumber;
  } catch(e){
    console.error(`could not parse expressionString "${expressionString}", expressionStrings must use one 
    of the following operators: [<=,<,=,>,>=] and follow a format like "<=_10%"`);
    return null;
  }
};

export const getConditionDirection = (condition: string) => {
  switch(condition){
    case '=':
      return 0;
    case '<':
      return -1;
    case '<=':
      return -1;
    case '>':
      return 1;
    case '>=':
      return 1;
    default: return 0;
  }
};