import React from 'react';
import { getColor, getShade } from '../../themes/';

import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import { 
  selectActivePet, 
  selectActivePetStats, 
  selectPetList, 
  setActiveIdx 
} from '../../services/petstore';
import { PetInfo } from './pet-info';
import { selectPingIdx } from '../../services/ui';

const ScContainer = styled.div`
  margin-top: -1rem;
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
  transition: padding-bottom .1s ease-in-out, background-color .1s ease-in-out;

  &:hover{
    background-color:${getShade('blue', 20)};
  }
  
  ${props => props.isActive && css`
    background-color:${getColor('green')};
    padding-bottom: .75rem;
    padding-top: .5rem;
    transition: padding .2s ease-out, background-color .2s ease-out;

    &:hover{
      background-color:${getShade('green', 40)};
    }
  `};

  cursor:pointer;
`

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
      <PetInfo
        activePet={activePet}
        activeStats={activeStats}
      />
    </ScContainer>
  )
}
