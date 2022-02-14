// slightly evolving from create-react-app example
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetDefinition, PetListItem } from '../../types';

import { RootState } from '../store';

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

export const selectActivePet = (state: RootState): PetDefinition => {
  return state.petStore.pets[state.petStore.activeIdx];
};

export const selectPetList = (state: RootState): PetListItem[] => {
  return state.petStore.pets.map(p => ({
    name: p.name,
    id: p.id
  }));
};

export default petStoreSlice.reducer;
