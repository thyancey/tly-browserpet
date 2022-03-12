import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { clearSave } from '../../services/petstore';

import { getColor, getShade } from '../../themes/';
import { PetTabs } from './pet-tabs';

const ScResetButton = styled.div`
  position:absolute;
  right:0rem;
  bottom:-.5rem;
  width:7rem;
  height:3rem;

  border-radius:1rem 1rem 0 0;
  background-color: ${getColor('red')};
  color: ${getColor('white')};

  font-size:1.5rem;
  font-weight:bold;
  text-align:center;
  line-height:2rem;
  text-shadow:1px 1px 1px ${getColor('black')};
  border:.5rem solid ${getColor('white')};

  cursor:pointer;
  &:hover{
    background-color: ${getShade('red', 40)};
  }
`;

const ScLogo = styled.h1`
  position:absolute;
  right:8rem;
  bottom:0;
  width:20rem;
  z-index:-1;

  font-size:1.5rem;
  text-align:right;
`;

const ScContainer = styled.div`
  display:flex;
  flex-direction:row;
  height:100%;

  >div{
    flex:1;
    position:relative;
  }
`

export const HeaderTop = () => {
  // let { push } = useHistory();
  const dispatch = useDispatch();

  return (
    <ScContainer>
      <div>
        <PetTabs />
      </div>
      <div>
        <ScLogo>{'Browser Pet'}</ScLogo>
        {/* <ScResetButton onClick={() => {push('/about')}}> */}
        <ScResetButton onClick={() => dispatch(clearSave())}>
          {'RESET'}
        </ScResetButton>
      </div>
    </ScContainer>
  )
}