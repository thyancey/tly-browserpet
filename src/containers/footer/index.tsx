import React from 'react';
import { getColor, getShade } from '../../themes/';

import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import { 
  selectActivePet, 
  selectActivePetStats, 
  selectPetList, 
  setActiveIdx 
} from '../../services/petstore/petstore-slice';
import { StatBar } from './stat-bar';

const ScContainer = styled.div`
  margin-top: -3.75rem;
  position:relative;
`;

const ScTabs = styled.ul`
  width:100%;
  margin-bottom:-.5rem;
  padding-left:1rem;
  position:absolute;
  left:0;
  bottom:100%;
`;

type ScTabProps = {
  isActive?: boolean
};

const ScTab = styled.li<ScTabProps>`
  list-style:none;
  margin:none;
  
  display:inline-block;
  vertical-align:bottom;
  background-color:white;
  color: black;

  font-size:2rem;
  line-height:2rem;
  font-weight:bold;
  padding: .25rem 1rem;
  padding-bottom: 0rem;
  margin-right:.25rem;

  border:.5rem solid ${getColor('white')};
  border-radius:1rem 1rem 0 0;

  background-color:${getColor('blue')};
  border-bottom-color: ${getColor('white')};
  color:${getColor('black')};
  transition: padding-bottom .1s ease-in-out;

  &:hover{
    background-color:${getShade('green', 40)};
  }
  
  ${props => props.isActive && css`
    background-color:${getColor('green')};
    padding-bottom: .75rem;
    padding-top: .75rem;
    transition: padding .2s ease-out;
  `};

  cursor:pointer;
`

const ScPetInfo = styled.div`
  width:100%;
  height:15rem;

  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: 0.25rem .5rem .5rem .5rem;
  font-weight:500;
  
  background-color:${getColor('green')};
  color: black;
  
  border:.5rem solid ${getColor('white')};
  border-radius:1rem;

  overflow-y:auto;
`

const ScStats = styled.div`
  width:100%;
  padding:.5rem;
`;

const ScBio = styled.div`
  padding:1rem;
  width:100%;
`;

const ScBioName = styled.h4`
`;
const ScBioInfo = styled.p`
  margin-top:1rem;
`;

export const Footer = () => {
  const activePet = useAppSelector(selectActivePet) || {};
  const petList = useAppSelector(selectPetList);
  const activeStats = useAppSelector(selectActivePetStats);
  const dispatch = useAppDispatch();

  return (
    <ScContainer>
      <ScTabs>
        {petList.map((p, idx) => (
          <ScTab 
            key={idx} 
            onClick={() => dispatch(setActiveIdx(idx))} 
            isActive={p.isActive}
          >
            {idx + 1}
          </ScTab>
        ))}
      </ScTabs>
      <ScPetInfo>
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
    </ScContainer>
  )
}
