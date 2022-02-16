import React from 'react';
import { getColor } from '../../themes/';

import styled from 'styled-components';
import { StatGroup } from './stat-group';
import { useAppSelector } from '../../services/hooks';
import { selectActivePet } from '../../services/petstore';

const ScPetInfo = styled.div`
  width:100%;
  height:16rem;

  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: 0.25rem .5rem .5rem .5rem;
  font-weight:500;
  
  background-color:${getColor('green')};
  color: black;
  
  border:.5rem solid ${getColor('white')};
  border-radius:1rem;

  overflow-y:auto;

  hr{
    border-color:${getColor('blue')};
    border-style:dashed;
    margin-top:.5rem;
    margin-bottom:.5rem;

    margin-left:10%;
    width:80%;
  }

`

const ScBio = styled.div`
  width:100%;
`;

const ScBioName = styled.h4`
  margin-top:1rem;
  margin-bottom:.5rem;
`;

const ScBioInfo = styled.p`
  margin-top:1rem;
  padding-left:1rem;
`;

const ScPetLabel = styled.div`
  color: ${getColor('black')};
  width:100%;
  display:flex;
  flex-direction: row;

  h4{
    margin-top:1rem;
    margin-bottom:.5rem;
  }
`;

const ScPetName = styled.h4`
  text-align:left;
  display:inline-block;
  flex:1;
`;

const ScPetLevel = styled.div`
  text-align:right;
  color: ${getColor('black')};
`;

export const PetInfo = () => {
  const activePet = useAppSelector(selectActivePet) || {};

  return (
    <ScPetInfo>
      <ScPetLabel>
        <ScPetName>{activePet.name}</ScPetName>
        <ScPetLevel><h4>{`L-${activePet.level}`}</h4></ScPetLevel>
      </ScPetLabel>
      <hr/>
      <StatGroup />
      <hr/>
      <ScBio>
        <ScBioName>{'Description'}</ScBioName>
        <ScBioInfo>{activePet.info}</ScBioInfo>
      </ScBio>
    </ScPetInfo>
  )
}
