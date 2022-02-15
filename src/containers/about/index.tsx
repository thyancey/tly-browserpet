import React from 'react';
import { useHistory } from 'react-router-dom';
import { getColor } from '../../themes/';

import styled from 'styled-components';

const ScContainer = styled.div`
  padding:1rem;
  color: ${getColor('blue')};
  min-width:30rem;
`;

const ScLogo = styled.h1`
  font-size:2rem;
  text-align:left;
`;

const ScButton = styled.button`
  border:0;
  margin:0;
  font-size:2rem;
  padding:.5rem 1rem;
  background-color: ${getColor('green')};
  border: .5rem solid ${getColor('white')};
  border-radius: 1rem;

  margin-top:2rem;
  text-align:center;
  cursor:pointer;
`

export const About = () => {
  let { push } = useHistory();

  return (
    <ScContainer>
      <ScLogo>{'About BrowserPet'}</ScLogo>
      <p>{'© Tom Yancey 2022'}</p>
      <ScButton onClick={() => {push('/')}}>
        {'BACK'}
      </ScButton>
    </ScContainer>
  )
}
