import React from 'react';
import { ConditionOperator, WhenNumber, WhenThenNumberGroup, WhenThenStringGroup } from '../types';
import { evaluateWhenThenNumberGroup, evaluateWhenThenStringGroup, evaluateWhenNumber } from './whenthen';
// import { render } from '@testing-library/react';

describe('#evaluateWhenThenStringGroup', () => {
  test('should match single when ', () => {
    const whenThenStringGroup = {
      when: ['MATCHING_CRITERIA'],
      then: 'EXPECTED_RESULT'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, ['MATCHING_CRITERIA']);
    expect(result).toBe('EXPECTED_RESULT');
  });

  test('should match multiple when requirements', () => {
    const whenThenStringGroup = {
      when: ['MATCHING_ONE', 'MATCHING_TWO'],
      then: 'EXPECTED_RESULT'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, ['MATCHING_ONE', 'MATCHING_TWO', 'SOMETHING_ELSE']);
    expect(result).toBe('EXPECTED_RESULT');
  });

  test('should return null on no match', () => {
    const whenThenStringGroup = {
      when: ['NOT_MATCHING_CRITERIA'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, ['MATCHING_CRITERIA']);
    expect(result).toBe(null);
  });

  test('should return null on only one when match', () => {
    const whenThenStringGroup = {
      when: ['MATCHING_ONE', 'MATCHING_TWO'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, ['MATCHING_ONE']);
    expect(result).toBe(null);
  });

  test('should return null on no provided criteria', () => {
    const whenThenStringGroup = {
      when: ['MATCHING_ONE'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, []);
    expect(result).toBe(null);
  });

  test('should return then if no required when', () => {
    const whenThenStringGroup = {
      when: [],
      then: 'EXPECTED_RESULT'
    } as WhenThenStringGroup
    const result = evaluateWhenThenStringGroup(whenThenStringGroup, []);
    expect(result).toBe('EXPECTED_RESULT');
  });
});

describe('#evaluateWhenThenNumberGroup', () => {
  test('should match on = when reference matches', () => {
    const whenThenNumberGroup = {
      when: [
        {
          condition: '=',
          criteria: 50,
          isPercent: false
        }
      ],
      then: 'EXPECTED_RESULT'
    } as WhenThenNumberGroup;

    expect(
      evaluateWhenThenNumberGroup(whenThenNumberGroup, 50, 100)
    ).toBe('EXPECTED_RESULT');
    expect(
      evaluateWhenThenNumberGroup(whenThenNumberGroup, 51, 100)
    ).toBe(null);
  });

  test('should not match if all when are true', () => {
    const whenThenNumberGroup = {
      when: [
        {
          condition: '=',
          criteria: 50,
          isPercent: false
        },
        {
          condition: '<',
          criteria: 52,
          isPercent: false
        }
      ],
      then: 'EXPECTED_RESULT'
    } as WhenThenNumberGroup;

    expect(
      evaluateWhenThenNumberGroup(whenThenNumberGroup, 50, 100)
    ).toBe('EXPECTED_RESULT');
  });

  test('should not match if all "whens" are not true', () => {
    const whenThenNumberGroup = {
      when: [
        {
          condition: '=',
          criteria: 70,
          isPercent: false
        },
        {
          condition: '=',
          criteria: 71,
          isPercent: false
        }
      ],
      then: 'EXPECTED_RESULT'
    } as WhenThenNumberGroup;

    expect(
      evaluateWhenThenNumberGroup(whenThenNumberGroup, 70, 100)
    ).toBe(null);
  });

  // just to maintain behavior, unless i want to validate for these ahead of time and not let em in
  test('should match on redundant', () => {
    const whenThenNumberGroup = {
      when: [
        {
          condition: '=',
          criteria: 50,
          isPercent: false
        },
        {
          condition: '=',
          criteria: 50,
          isPercent: false
        }
      ],
      then: 'EXPECTED_RESULT'
    } as WhenThenNumberGroup;

    expect(
      evaluateWhenThenNumberGroup(whenThenNumberGroup, 50, 100)
    ).toBe('EXPECTED_RESULT');
  });
  
  test('should match literal "=" condition', () => {
    const whenThenNumberGroup = {
      when: [
        {
          condition: '=',
          criteria: 50,
          isPercent: false
        }
      ],
      then: 'EXPECTED_RESULT'
    } as WhenThenNumberGroup;
    const result = evaluateWhenThenNumberGroup(whenThenNumberGroup, 50, 100);
    expect(result).toBe('EXPECTED_RESULT');
  });
});

describe('#evaluateWhenNumber', () => {
  test('should match on literal "=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 50,
        isPercent: false
      }, 50, 100)
    ).toBe(true);
  });
  test('should not match on unequal literal "=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 50,
        isPercent: false
      }, 74, 100)
    ).toBe(false);
  });

  // percentage "=" matching isnt intended, but is still expected to work
  test('should match on percentage "=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 0,
        isPercent: true
      }, 0, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 50,
        isPercent: true
      }, 50, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 100,
        isPercent: true
      }, 100, 100)
    ).toBe(true);
  });
  test('should not match on unequal percentage "=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '=',
        criteria: 50.1,
        isPercent: true
      }, 50, 100)
    ).toBe(false);
  });

  test('should match on literal ">" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: false
      }, 60, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: false
      }, 40, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: false
      }, 50, 100)
    ).toBe(false);
  });

  test('should match on percentage ">" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: true
      }, 60, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: true
      }, 40, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '>',
        criteria: 50,
        isPercent: true
      }, 50, 100)
    ).toBe(false);
  });

  test('should match on literal ">=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: false
      }, 60, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: false
      }, 40, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: false
      }, 50, 100)
    ).toBe(true);
  });

  test('should match on percentage ">=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: true
      }, 60, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: true
      }, 40, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '>=',
        criteria: 50,
        isPercent: true
      }, 50, 100)
    ).toBe(true);
  });

  test('should match on literal "<=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: false
      }, 60, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: false
      }, 40, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: false
      }, 50, 100)
    ).toBe(true);
  });

  test('should match on percentage "<=" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: true
      }, 60, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: true
      }, 40, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '<=',
        criteria: 50,
        isPercent: true
      }, 50, 100)
    ).toBe(true);
  });

  test('should match on literal "<" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: false
      }, 60, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: false
      }, 40, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: false
      }, 50, 100)
    ).toBe(false);
  });

  test('should match on percentage "<" condition', () => {
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: true
      }, 60, 100)
    ).toBe(false);
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: true
      }, 40, 100)
    ).toBe(true);
    expect(
      evaluateWhenNumber({
        condition: '<',
        criteria: 50,
        isPercent: true
      }, 50, 100)
    ).toBe(false);
  });

});
