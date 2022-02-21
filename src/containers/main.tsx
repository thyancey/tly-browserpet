import React from 'react';
import styled from 'styled-components';

import { getColor } from '../themes/';

import { Footer } from './footer';
import { PetContainer } from './pet-container';
import { Header } from './header';

const ScContainer = styled.div`
  padding:1rem;
  color: ${getColor('blue')};
  min-width:36rem;
`;

export const Main = () => {
  return (
    <ScContainer>
      <Header />
      <PetContainer />
      <Footer />
    </ScContainer>
  )
}
