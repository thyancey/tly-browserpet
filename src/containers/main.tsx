import React from 'react';
import { useHistory } from 'react-router-dom';
import { getColor, getShade } from '../themes/';
import { Footer } from './footer';
import { Helper } from './helper';

import styled from 'styled-components';
import { Loader } from './loader';
import { useAppSelector } from '../services/hooks';
import {  
  selectActivePet, 
} from '../services/petstore';

const ScHeader = styled.header`
  position: relative;  
`;

const ScContainer = styled.div`
  padding:1rem;
  color: ${getColor('blue')};
  min-width:30rem;
`;

const ScHelpButton = styled.div`
  position:absolute;
  right:0rem;
  bottom:-.5rem;
  width:3rem;
  height:3rem;

  border-radius:2rem 2rem 0 0;
  background-color: ${getColor('blue')};
  color: ${getColor('white')};

  font-size:1.5rem;
  font-weight:bold;
  text-align:center;
  line-height:2rem;
  text-shadow: 1px 1px 1px ${getColor('black')};
  border: .5rem solid ${getColor('white')};

  cursor:pointer;
  &:hover{
    background-color: ${getShade('blue', 20)};
  }
`;

const ScLogo = styled.h1`
  font-size:2rem;
  text-align:left;
`;

const ScPetContainer = styled.div`
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius:1rem 0 0 0;
  width: 100%;
  height: 30rem;

  padding-bottom: 1rem;
`;

const ScPetImage = styled.div`
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  width:100%;
  height:100%;
  text-align:center;
`;

export const Main = () => {
  let { push } = useHistory();
  const activePet = useAppSelector(selectActivePet) || {};

  console.log('Main.render');

  return (
    <ScContainer>
      <ScHeader>
        <Helper />
        <Loader />
        <ScLogo>{'Browser Pet'}</ScLogo>
        <ScHelpButton onClick={() => {push('/about')}}>
          {'?'}
        </ScHelpButton>
      </ScHeader>
      <ScPetContainer>
        <ScPetImage style={{ backgroundImage: `url(${activePet.image})` }}/>
      </ScPetContainer>
      <Footer />
    </ScContainer>
  )
}
