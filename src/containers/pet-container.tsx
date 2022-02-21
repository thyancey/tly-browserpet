import React from 'react';
import styled from 'styled-components';

import { getColor } from '../themes/';
import { selectActiveDeltaStatuses, selectActivePetImage } from '../services/petstore';
import { shallowEqual, useSelector } from 'react-redux';

const ScPetContainer = styled.div`
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius:1rem 0 0 0;
  width: 100%;
  height: 30rem;

  padding-bottom: 1rem;
`;

const ScPetImage = styled.div`
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  width:100%;
  height:100%;
  text-align:center;
`;

const ScStatuses = styled.ul`
`;

const ScStatus = styled.li`
  list-style:none;
  color:black;
  margin:1rem;
  font-weight:bold;
`;

export const PetContainer = () => {
  const activePetImage = useSelector(selectActivePetImage);
  const activeDeltaStatuses = useSelector(selectActiveDeltaStatuses, shallowEqual);

  return (
    <ScPetContainer>
      <ScStatuses>
        {activeDeltaStatuses.map((dS,i) => (
          <ScStatus key={i}>{dS}</ScStatus>
        ))}
      </ScStatuses>
      <ScPetImage style={{ backgroundImage: `url(${activePetImage})` }}/>
    </ScPetContainer>
  )
}
