import React from 'react';
import { getColor } from '../../themes/';

import styled from 'styled-components';
import { StatBar } from './stat-bar';
import { PetStatDefinition, PetDefinition } from '../../types';

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

const ScStats = styled.div`
  width:100%;
`;

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

type PetInfoProps = {
  activePet: PetDefinition,
  activeStats: PetStatDefinition[]
}
export const PetInfo = ({activePet, activeStats}: PetInfoProps) => {
  return (
    <ScPetInfo>
      <ScPetLabel>
        <ScPetName>{activePet.name}</ScPetName>
        <ScPetLevel><h4>{`L-${activePet.level}`}</h4></ScPetLevel>
      </ScPetLabel>
      <hr/>
      <ScStats>
        {activeStats.map((s, idx) => (
          <StatBar 
            key={idx}
            label={s.label}
            percent={0.5}
            max={100}
            value={50}
          />
        ))}
      </ScStats>
      <hr/>
      <ScBio>
        <ScBioName>{'Description'}</ScBioName>
        <ScBioInfo>{activePet.info}</ScBioInfo>
      </ScBio>
    </ScPetInfo>
  )
}
