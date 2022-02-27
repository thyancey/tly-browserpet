import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getColor, getShade } from '../../themes/';
import { PetTabs } from './pet-tabs';

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
  text-shadow:1px 1px 1px ${getColor('black')};
  border:.5rem solid ${getColor('white')};

  cursor:pointer;
  &:hover{
    background-color: ${getShade('blue', 20)};
  }
`;

const ScLogo = styled.h1`
  font-size:2rem;
  text-align:right;
  margin-right:4rem;
  margin-bottom:-.5rem;
`;

const ScContainer = styled.div`
  display:flex;
  flex-direction:row;

  >div{
    flex:1;
    position:relative;
  }
`

export const HeaderTop = () => {
  let { push } = useHistory();

  return (
    <ScContainer>
      <div>
        <PetTabs />
      </div>
      <div>
        <ScLogo>{'Browser Pet'}</ScLogo>
        <ScHelpButton onClick={() => {push('/about')}}>
          {'?'}
        </ScHelpButton>
      </div>
    </ScContainer>
  )
}
