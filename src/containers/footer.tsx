import React from 'react';
import { getColor } from '../themes/';

import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../services/hooks';

import { 
  selectActivePet, 
  selectActivePetStats, 
  selectPetList, 
  setActiveIdx 
} from '../services/petstore/petstore-slice';

const ScContainer = styled.div`
  margin-top: -3.75rem;
`;

const ScTabs = styled.ul`
  width:100%;
  margin-bottom:-.5rem;
  padding-left:1rem;
`;

type ScTabProps = {
  isActive?: boolean
};

const ScTab = styled.li<ScTabProps>`
  list-style:none;
  margin:none;
  padding:none;
  
  background-color:white;
  color: black;

  font-size:2rem;
  line-height:2rem;
  font-weight:bold;
  padding: .25rem 1rem;
  margin-right:.25rem;
  display: inline-block;

  border:.5rem solid ${getColor('white')};
  border-radius:1rem 1rem 0 0;

  background-color:${getColor('blue')};
  border-bottom-color: ${getColor('white')};
  color:${getColor('black')};
  
  ${props => props.isActive && css`
    background-color:${getColor('green')};
    border-bottom-color: ${getColor('green')};
    color:${getColor('black')};
  `};

  cursor:pointer;
`

const ScPetInfo = styled.div`
  position:relative;
  width:100%;
  height:10rem;

  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: 0.25rem .5rem .5rem .5rem;
  font-weight:500;
  
  background-color:${getColor('green')};
  color: black;
  
  border:.5rem solid ${getColor('white')};
  border-radius:1rem;
`

const ScStats = styled.ul`
  position:absolute;
  width:100%;
  height:80%;
  left:0;
  bottom:0;
  border: 3px solid black;
`;
// type PropTypes = {
//   onTab: Function
// }
// export const Footer = ({ onTab }: PropTypes) => {

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
        {activePet.info}
        <ScStats>
          {activeStats.map(s => <div key={s.id}>{s.label}</div>)}
        </ScStats>
      </ScPetInfo>
    </ScContainer>
  )
}
