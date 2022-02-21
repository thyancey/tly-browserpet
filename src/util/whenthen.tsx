import { ConditionOperator, RawWhenThen, WhenNumber, WhenThenNumberGroup, WhenThenStringGroup } from '../types';


export const evaluateWhenThenNumberGroup = (whenThenNumberGroup: WhenThenNumberGroup, referenceValue: number, maxValue:number) => {
  if(whenThenNumberGroup.when.find(w => !evaluateWhenNumber(w, referenceValue, maxValue))){
    // something in the required group was not found
    return null;
  }
  return whenThenNumberGroup.then;
};

export const evaluateWhenThenStringGroup = (whenThenStringGroup: WhenThenStringGroup, stringCriteria: string[]) => {
  // remember, an empty when skips this and just returns the result
  if (whenThenStringGroup.when.find(w => stringCriteria.indexOf(w) === -1)){
    // something in the required group was not found
    return null;
  };

  return whenThenStringGroup.then;
};

export const parseRawWhenThenGroup = (rawWhenThenGroup: RawWhenThen[], type: 'stats' | 'statuses') => {
  if(type === 'statuses'){
    return rawWhenThenGroup.map(rwt => {
      // json should support string or array, make this better
      const whens = typeof rwt.when === 'string' ? [ rwt.when ] : rwt.when;
      return {
        when: whens,
        then: rwt.then
      } as WhenThenStringGroup;
    }) as WhenThenStringGroup[];
  } else if (type === 'stats'){
    if(!rawWhenThenGroup) return [] as WhenThenNumberGroup[];
    return rawWhenThenGroup.map(rwt => {
      // json should support string or array, make this better
      const whens = typeof rwt.when === 'string' ? [ rwt.when ] : rwt.when;
      return {
        when: whens.map(w => parseExpressionString(w)).filter(w => w !== null),
        then: rwt.then
      } as WhenThenNumberGroup;
    }) as WhenThenNumberGroup[];
  }
  return [] as WhenThenNumberGroup[];
};

/*
  //- convert <=_20% into:
  {
    condition: '<=',
    criteria: '20',
    isPercent: true
  }
*/
export const EXPRESSION_MAP = {
  '=': (v:number, c:number) => (v === c),
  '<': (v:number, c:number) => (v < c),
  '<=': (v:number, c:number) => (v <= c),
  '>': (v:number, c:number) => (v > c),
  '>=': (v:number, c:number) => (v >= c)
};

export const parseExpressionString = (expressionString: string) => {
  try{
    const valueTokens = expressionString.split('_');
    const condition = valueTokens[0] as ConditionOperator;
    const valueCriteria = valueTokens[1];
    const percentageSplit = valueCriteria.split('%');

    if(!EXPRESSION_MAP[condition]){
      throw `parseExpressionString(): invalid condition "${condition}" from expressionString "${expressionString}"`
    }
  
    return {
      condition: condition,
      criteria: Number(percentageSplit[0]),
      isPercent: percentageSplit.length > 1
    } as WhenNumber;
  } catch(e){
    console.error(`could not parse expressionString "${expressionString}", expressionStrings must use one 
    of the following operators: [<=,<,=,>,>=] and follow a format like "<=_10%"`);
    return null;
  }
};

export const evaluateWhenNumber = (whenNumber: WhenNumber, reference: number, referenceMax: number) => {
  try{
    const referenceValue = whenNumber.isPercent ? 
      Math.round((reference / referenceMax) * 100)
      : reference;
    return EXPRESSION_MAP[whenNumber.condition](referenceValue, whenNumber.criteria);
  }catch(e){
    throw `could not evaluate "whenNumber:${whenNumber}", "reference:${reference}", "referenceMax:${reference}"`;
  }
};

