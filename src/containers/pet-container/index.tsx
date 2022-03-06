import React from 'react';
import styled, { css } from 'styled-components';

import { getColor } from '../../themes/';
import { selectActiveBehavior, selectActiveBg } from '../../services/petstore';
import { shallowEqual, useSelector } from 'react-redux';
import { Statuses } from './statuses';

type ScContainerProps = {
  bgImageUrl?: string;
}

const ScContainer = styled.div<ScContainerProps>`
  position:absolute;
  left:0;
  right:0;
  top:-2rem;
  padding-top:2rem;
  bottom:-2rem;
  padding-bottom:2rem;
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};

  ${p => p.bgImageUrl && css`
    background-size:cover;
    background-position: center;
    background-image:url(${p.bgImageUrl});
  `}
`;

const ScPetImage = styled.div`
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  width:100%;
  height:100%;
  text-align:center;

  position:absolute;
  bottom:0;
  left:0;
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
  const bgImageUrl = useSelector(selectActiveBg, shallowEqual);
  console.log('bgImageUrl', bgImageUrl)
  return (
    <ScContainer bgImageUrl={bgImageUrl}>
      { activeBehavior && (
        <>
          <ScBehavior>{`behavior: ${activeBehavior.id}`}</ScBehavior>
          <Statuses />
          <ScPetImage style={{ 
            backgroundImage: `url(${activeBehavior.imageUrl})`, 
            backgroundPosition: `${activeBehavior.position}`,
            left: `${activeBehavior.offsetX}px`,
            bottom: `${activeBehavior.offsetY}px`
          }}/>
        </>
      ) }
    </ScContainer>
  )
}
