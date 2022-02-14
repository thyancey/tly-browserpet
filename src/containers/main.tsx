import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getColor } from '../themes/';
import { PetData } from '../types';
import { jsonc } from 'jsonc';

import { Footer } from './footer';

import styled from 'styled-components';

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

const petData: PetData[] = [
  {
    name: 'Bunchie',
    image: 'assets/pets/bunchie/happy.gif',
    level: 3,
    info: 'A big dumb hopping green llama.'
  },{
    name: 'Dead Raccoon',
    image: 'assets/pets/raccoon/dead.gif',
    level: 2,
    info: 'A dead, bloated raccoon, with a belly full of old seafood.'
  }
];

const readIt = () => {
  const url =  `assets/data.jsonc`;

  fetch(url, {
    mode: 'cors'
  })
    .then(res => res.text())
    .then(
      text => jsonc.parse(text), 
      err => {
        console.error(`Error fretching item from ${url}`, err);
      }
    ) //- bad url responds with 200/ok? so this doesnt get thrown
    .then(
      json => {
        console.log(`data was read successfully`, json);

        return true;
      }, 
      err => {
        console.error(`Error parsing (the url (${url}) was bad), skipping`, err?.stack || err);
      }
    );
}

export const Main = () => {
  let { push } = useHistory();
  const [curPetIdx, setCurPetIdx] = useState<number>(0);
  useEffect(() => {
    readIt();
  }, [])


  const pet:PetData = useMemo(() => {
    return petData[curPetIdx]
  }, [ curPetIdx ])

  return (
    <ScContainer>
      <header>
        <ScLogo>{'Virtual Pet'}</ScLogo>
        <ScHelpButton onClick={() => {push('/about')}}>
          {'?'}
        </ScHelpButton>
        <hr/>
        <ScPetLabel>
          <ScPetName>{pet.name}</ScPetName>
          <ScPetLevel><span>{'Level: '}</span><span>{pet.level}</span></ScPetLevel>
        </ScPetLabel>
      </header>
      <ScPetContainer>
        <ScPetImage style={{ backgroundImage: `url(${pet.image})` }}/>
      </ScPetContainer>
      <Footer 
        curPet={pet}
        curPetIdx={curPetIdx}
        pets={petData}
        onTab={(tabId:number) => setCurPetIdx(tabId)}
      />
    </ScContainer>
  )
}
