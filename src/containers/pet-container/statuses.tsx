import React from 'react';
import styled, { css } from 'styled-components';

import { selectDetailedActiveDeltaStatuses } from '../../services/petstore';
import { shallowEqual, useSelector } from 'react-redux';
import { getColor, mixinColorBubble, tColor } from '../../themes';
import { AlertType } from '../../types';

const ScContainer = styled.div`
  color:${getColor('black')};
  position:absolute;
  right:0;
  bottom:1rem;
  z-index:1;
`;
const ScStatuses = styled.ul`
  max-width: 14rem;
  text-align: right;
`;

interface ScStatusProps {
  bubbleColors: tColor[]
}
const ScStatus = styled.li<ScStatusProps>`
  /* display:inline-block; */
  white-space:nowrap;
  text-align:right;
  z-index:1;
  
  list-style:none;
  color:black;
  margin-top: -.5rem;
  margin-right: -1rem;
  font-weight:bold;
  font-size: 2rem;

  /* border-top-left-radius: 0; */
  border-bottom-right-radius: 0;
  padding:.5rem 1rem;

  position:absolute;
  bottom:0;
  right:0;

  /* transition: transform .2s ease-in-out, bottom .2s ease-out; */
  -webkit-transition: all 0.2s cubic-bezier(.72,1.79,.4,.8);
  transition: all 0.2s cubic-bezier(.72,1.79,.4,.8);
  ${props => mixinColorBubble(props.bubbleColors[0], props.bubbleColors[1])}
`;

const getBubbleColors = (alertType?: AlertType) => {
  switch(alertType){
    case 'alert': return [ 'red', 'yellow' ];
    case 'warning': return [ 'yellow', 'red' ];
    case 'reward': return [ 'green', 'white' ];
    default: return [ 'white', 'red' ];
  }
}

const getRotation = () => {
  return -5 + Math.random() * 5;
}
const getBottom = (index:number) => {
  return index * 35;
}

export const Statuses = () => {
  const activeDeltaStatuses = useSelector(selectDetailedActiveDeltaStatuses, shallowEqual);
  
  return (
    <ScContainer>
      <ScStatuses>
        {activeDeltaStatuses.map((dS,i) => (
          <ScStatus 
            key={dS.id} 
            id={dS.id}
            bubbleColors={getBubbleColors(dS.alertType) as tColor[]} 
            style={{ bottom: getBottom(i), transform: `rotate(${getRotation()}deg)`}}>
              {dS.label}
          </ScStatus>
        ))}
      </ScStatuses>
    </ScContainer>
  )
}
