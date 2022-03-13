import React from 'react';
import { RootState } from '../store';
import reducer, { PetStoreState, selectRenderedDeltaStats, selectActiveIdx, setActiveId } from './index';
// import { render } from '@testing-library/react';


describe('#petstore.reducers', () => {
  describe('#setActiveId', () => {
    test('should add valid idx', () => {
      const prevState = {
        activeIdx: -1,
        pets: [{
          id:'pet-def1'
        },{
          id:'pet-def2'
        }]
      } as PetStoreState;

      expect(reducer(prevState, setActiveId('pet-def2'))).toEqual(expect.objectContaining({
        activeIdx: 1
      }));
    });
    
    // test('should error and on invalid pet idx', () => {
    //   const prevState = {
    //     activeIdx: -1,
    //     pets: [{
    //       id:'pet-def1'
    //     },{
    //       id:'pet-def2'
    //     }]
    //   } as PetStoreState;

    //   expect(() => {reducer(prevState, setActiveId('pet-def0'))}).toThrow(`Cannot find pet with id \"pet-def0\"`);
    // });
  });
});

describe('#petstore.selectors', () => {
  describe('#selectActiveIdx', () => {
    test('should select activeIdx', () => {
      const mockState = {
        petStore:{
          activeIdx: 3
        }
      } as RootState;
  
      expect(selectActiveIdx(mockState)).toEqual(3);
    });
  });

  
  describe('#selectRenderedDeltaStats', () => {
    test('should increase stat over time', () => {
      const lastTime = 1000;
      const time = 3000;
      expect(selectRenderedDeltaStats.resultFunc(
        [
          {
            id: 'food',
            label: 'Food',
            value: 5,
            perSecond: 1,
            max: 10,
            fullIsGood: true,
            statEffects: []
          }
        ],
        [],
        lastTime,
        time
      )).toEqual([{
        id: 'food',
        label: 'Food',
        value: 7,
        max: 10
      }]);
    });
    
    test('should decrease stat over time', () => {
      const lastTime = 1000;
      const time = 3000;
      expect(selectRenderedDeltaStats.resultFunc(
        [
          {
            id: 'food',
            label: 'Food',
            value: 5,
            perSecond: -1.5,
            max: 10,
            fullIsGood: true,
            statEffects: []
          }
        ],
        [],
        lastTime,
        time
      )).toEqual([{
        id: 'food',
        label: 'Food',
        value: 2,
        max: 10
      }]);
    });
    
    test('stat should not go past 0 or max', () => {
      const lastTime = 1000;
      const time = 10000;
      expect(selectRenderedDeltaStats.resultFunc(
        [
          {
            id: 'food',
            label: 'Food',
            value: 5,
            perSecond: 3,
            max: 10,
            fullIsGood: true,
            statEffects: []
          },{
            id: 'other',
            label: 'Other',
            value: 5,
            perSecond: -3,
            max: 10,
            fullIsGood: true,
            statEffects: []
          }
        ],
        [],
        lastTime,
        time
      )).toEqual([{
        id: 'food',
        label: 'Food',
        value: 10,
        max: 10
      },{
        id: 'other',
        label: 'Other',
        value: 0,
        max: 10
      }]);
    });
  });
});