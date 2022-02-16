// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PetDefinition, PetListItem, PetStatDefinition } from '../../types';

import { RootState } from '../store';
import { selectPingIdx } from '../ui';

export type PetStoreState = {
  activeIdx: number,
  pets: PetDefinition[]
}

const initialState: PetStoreState = {
  activeIdx: 0,
  pets: []
};

export const petStoreSlice = createSlice({
  name: 'petStore',
  initialState,
  reducers: {
    setActiveIdx: (state: PetStoreState, action: PayloadAction<any>) => {
      state.activeIdx = action.payload;
    },
    setPet: (state: PetStoreState, action: PayloadAction<any>) => {
      const petData = action.payload as PetDefinition;
      const foundPet = state.pets.find(p => p.id === petData.id);
      if(foundPet){
        console.error('already added pet, redoing it ', petData);
        state.pets = state.pets.map(p => {
          if(p.id === petData.id){
            return petData;
          }else{
            return p;
          }
        });
      }else{
        console.log('adding pet ', petData);
        state.pets.push(petData);
      }
    }
  }
});

export const { setPet, setActiveIdx } = petStoreSlice.actions;

export const selectActiveIdx = (state: RootState): number => {
  return state.petStore.activeIdx;
};

export const selectPets = (state: RootState): PetDefinition[] => {
  return state.petStore.pets;
};

export const selectActivePet = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => {
    return pets[activeIdx];
  }
);

export const selectActivePetStats = createSelector(
  [selectActivePet, selectPingIdx], 
  (activePet, pingIdx) => {
    // TODO: all the delta stat stuff
    const stats = activePet?.stats || [];
    return stats.map(s => ({
      ...s,
      value: s.value + pingIdx
    }));
  }
);

export const selectPetList = createSelector(
  [selectPets, selectActiveIdx],
  (pets, activeIdx) => pets.map((p, idx) => ({
    name: p.name,
    id: p.id,
    isActive: idx === activeIdx
  }))
);

export default petStoreSlice.reducer;
