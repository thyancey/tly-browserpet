import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getColor, getShade } from '../themes/';
import { clearSave } from '../services/petstore';

import Helpers from './helpers';
import { useDispatch } from 'react-redux';
import { pingStore } from '../services/ui';

const ScHeader = styled.header`
  position: relative;  
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

const ScSaveButton = styled.button`
  position: absolute;
  right: 1.5rem;

  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius:2rem 0 0 0;

  padding: 0.5rem 2rem 0rem;
  bottom: -0.5rem;

  color: ${getColor('white')};
  text-shadow: 1px 1px 1px ${getColor('black')};

  font-size:1.5rem;
  line-height:2rem;
  font-weight:bold;
  cursor: pointer;
  &:hover{
    background-color: ${getShade('blue', 20)};
  }
`

const ScResetButton = styled.button`
  position: absolute;
  right: 12.5rem;

  background-color: ${getColor('red')};
  border:.5rem solid ${getColor('white')};
  border-radius:2rem 0 0 0;

  padding: 0.5rem 2rem 0rem;
  bottom: -0.5rem;

  color: ${getColor('white')};
  text-shadow: 1px 1px 1px ${getColor('black')};

  font-size:1.5rem;
  line-height:2rem;
  font-weight:bold;
  cursor: pointer;
  &:hover{
    background-color: ${getShade('red', 40)};
  }
`

export const Header = () => {
  let { push } = useHistory();
  const dispatch = useDispatch();

  return (
    <ScHeader>
      <Helpers />
      <ScLogo>{'Browser Pet'}</ScLogo>
      <ScResetButton onClick={() => {dispatch(clearSave())}}>
        <p>{'CLEAR SAVE'}</p>
      </ScResetButton>
      <ScSaveButton onClick={() => {dispatch(pingStore({ time: new Date().getTime(), doSave: true }))}}>
        <p>{'FORCE SAVE'}</p>
      </ScSaveButton>
      <ScHelpButton onClick={() => {push('/about')}}>
        {'?'}
      </ScHelpButton>
    </ScHeader>
  )
}
