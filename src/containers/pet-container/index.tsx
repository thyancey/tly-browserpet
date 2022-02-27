import React from 'react';
import styled from 'styled-components';

import { getColor } from '../../themes/';
import { selectActiveBehavior } from '../../services/petstore';
import { shallowEqual, useSelector } from 'react-redux';
import { Statuses } from './statuses';

const ScContainer = styled.div`
  position:absolute;
  left:0;
  right:0;
  top:-2rem;
  padding-top:2rem;
  bottom:-2rem;
  padding-bottom:2rem;
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
`;

const ScPetImage = styled.div`
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  width:100%;
  height:100%;
  text-align:center;
`;

const ScBehavior = styled.p`
  font-size:2rem;
  color:${getColor('white')};
  opacity: .5;

  position:absolute;
  top:1rem;
  right:1rem;
`

export const PetContainer = () => {
  const activeBehavior = useSelector(selectActiveBehavior, shallowEqual);
  console.log('behavior', activeBehavior)
  return (
    <ScContainer>
      { activeBehavior && (
        <>
          <ScBehavior>{`behavior: ${activeBehavior.id}`}</ScBehavior>
          <Statuses />
          <ScPetImage style={{ backgroundImage: `url(${activeBehavior.imageUrl})` }}/>
        </>
      ) }
    </ScContainer>
  )
}
