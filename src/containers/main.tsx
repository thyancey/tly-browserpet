import React from 'react';
import styled from 'styled-components';

import { getColor } from '../themes/';

import Helpers from './helpers';
import { Footer } from './footer';
import { PetContainer } from './pet-container';
import { Header } from './header';

const ScContainer = styled.div`
  padding:1rem;
  color: ${getColor('blue')};
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;

  display:grid;
  grid-template-columns: auto;
  grid-template-rows: 10rem auto 20rem;
  grid-template-areas:
    "header"
    "body"
    "footer";

  >div{
    position:relative;
  }
`;

const ScHeader = styled.div`
  grid-area: header;
`;

const ScBody = styled.div`
  grid-area: body;
`;


const ScFooter = styled.div`
  grid-area: footer;
`;


export const Main = () => {
  return (
    <ScContainer>
      <Helpers />
      <ScHeader>
        <Header />
      </ScHeader>
      <ScBody>
        <PetContainer />
      </ScBody>
      <ScFooter>
        <Footer />
      </ScFooter>
    </ScContainer>
  )
}
