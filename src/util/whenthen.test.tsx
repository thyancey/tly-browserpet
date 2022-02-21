import React from 'react';
import { WhenThenString } from '../types';
import { evaluateWhenThenNumberGroup, evaluateWhenThenStringGroup } from './whenthen';
// import { render } from '@testing-library/react';

describe('#evaluateWhenThenStringGroup', () => {
  test('should match single when ', () => {
    const whenThenString = {
      when: ['MATCHING_CRITERIA'],
      then: 'EXPECTED_RESULT'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, ['MATCHING_CRITERIA']);
    expect(result).toBe('EXPECTED_RESULT');
  });

  test('should match multiple when requirements', () => {
    const whenThenString = {
      when: ['MATCHING_ONE', 'MATCHING_TWO'],
      then: 'EXPECTED_RESULT'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, ['MATCHING_ONE', 'MATCHING_TWO', 'SOMETHING_ELSE']);
    expect(result).toBe('EXPECTED_RESULT');
  });

  test('should return null on no match', () => {
    const whenThenString = {
      when: ['NOT_MATCHING_CRITERIA'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, ['MATCHING_CRITERIA']);
    expect(result).toBe(null);
  });

  test('should return null on only one when match', () => {
    const whenThenString = {
      when: ['MATCHING_ONE', 'MATCHING_TWO'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, ['MATCHING_ONE']);
    expect(result).toBe(null);
  });

  test('should return null on no provided criteria', () => {
    const whenThenString = {
      when: ['MATCHING_ONE'],
      then: 'SHOULDNT_GET_THIS'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, []);
    expect(result).toBe(null);
  });

  test('should return then if no required when', () => {
    const whenThenString = {
      when: [],
      then: 'EXPECTED_RESULT'
    } as WhenThenString
    const result = evaluateWhenThenStringGroup(whenThenString, []);
    expect(result).toBe('EXPECTED_RESULT');
  });
})