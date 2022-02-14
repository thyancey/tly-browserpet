import React from 'react';
import { useHistory } from 'react-router-dom';
import { getColor } from '../themes/';
import { Footer } from './footer';

import styled from 'styled-components';
import { Loader } from './loader';
import { useAppSelector } from '../services/hooks';
import {  
  selectActivePet, 
} from '../services/petstore/petstore-slice';

const ScContainer = styled.div`
  padding:1rem;
  color: ${getColor('blue')};
`;

const ScHelpButton = styled.div`
  position:absolute;
  right:1rem;
  top:1rem;
  width:2.5rem;
  height:2.5rem;

  border-radius:2rem;
  background-color: ${getColor('blue')};
  color: ${getColor('white')};

  font-size:2rem;
  font-weight:bold;
  text-align:center;
  line-height:2rem;
  text-shadow: 1px 1px 1px ${getColor('black')};
  border: 2px solid ${getColor('white')};
`;

const ScLogo = styled.h1`
  font-size:2rem;
  text-align:left;
`;

const ScPetLabel = styled.div`
  margin-top:.5rem;
  color: ${getColor('green')};
  width:100%;
  display:flex;
  flex-direction: row;

  h2{
    font-size:1.5rem;
  }
`;
const ScPetName = styled.h2`
  text-align:left;
  display:inline-block;
  flex:1;
`;
const ScPetLevel = styled.h2`
  text-align:right;
  color: ${getColor('yellow')};

  &:first-child{
    color: ${getColor('white')};
  }
`;

const ScPetContainer = styled.div`
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius:1rem 1rem 0 0;
  width: 100%;
  height: 30rem;

  padding-bottom: 2rem;
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

  return (
    <ScContainer>
      <header>
        <Loader />
        <ScLogo>{'Virtual Pet'}</ScLogo>
        <ScHelpButton onClick={() => {push('/about')}}>
          {'?'}
        </ScHelpButton>
        <hr/>
        <ScPetLabel>
          <ScPetName>{activePet.name}</ScPetName>
          <ScPetLevel><span>{'Level: '}</span><span>{activePet.level}</span></ScPetLevel>
        </ScPetLabel>
      </header>
      <ScPetContainer>
        <ScPetImage style={{ backgroundImage: `url(${activePet.image})` }}/>
      </ScPetContainer>
      <Footer />
    </ScContainer>
  )
}
