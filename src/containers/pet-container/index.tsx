import React from 'react';
import styled from 'styled-components';

import { getColor } from '../../themes/';
import { selectActiveBehavior, selectActivePetImage } from '../../services/petstore';
import { shallowEqual, useSelector } from 'react-redux';
import { Statuses } from './statuses';

const ScPetContainer = styled.div`
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius:1rem 0 0 0;
  width: 100%;
  height: 30rem;

  padding-bottom: 1rem;
  position: relative;
`;

const ScPetImage = styled.div`
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  width:100%;
  height:100%;
  text-align:center;
`;

export const PetContainer = () => {
  const activeBehavior = useSelector(selectActiveBehavior, shallowEqual);
  console.log('behavior', activeBehavior)
  return (
    <ScPetContainer>
      <Statuses />
      { activeBehavior && (
        <ScPetImage style={{ backgroundImage: `url(${activeBehavior.image})` }}/>
      ) }
    </ScPetContainer>
  )
}
