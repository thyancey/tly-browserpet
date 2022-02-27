import React from 'react';
import styled from 'styled-components';
import { getColor } from '../../../themes';
import { ActiveInteractionStatus, PetInteractionDefinition } from '../../../types';
import { ProgressBar } from './progress-bar';


const ScInteraction = styled.li`
  text-align:center;
`;

const ScButton = styled.div`
  font-weight:bold;
  font-size: 2rem;

  padding:1rem 1.5rem;

  position:relative;
  overflow: hidden;
  cursor:pointer;

  
  background-color: ${getColor('blue')};
  color: ${getColor('white')};
  border: .5rem solid ${getColor('white')};
  border-radius: 1rem;
`;

const ScCooldownButton = styled(ScButton)`
  background-color: ${getColor('red')};
  border-color: ${getColor('white')};
  color: ${getColor('white')};

  cursor:not-allowed;
`;

const ScLabel = styled.p`
  display:block;
  position:relative;
  z-index:2;
  font-size: 2rem;
`

type InteractionButtonProps = {
  activeStatus?: ActiveInteractionStatus,
  interaction: PetInteractionDefinition,
  onClickHandler?: Function
}

export const InteractionButton = ({activeStatus, interaction, onClickHandler}: InteractionButtonProps) => {
  if(activeStatus){
    const total = activeStatus.endAt - activeStatus.startAt; 
    const progress = (total - (activeStatus.endAt - new Date().getTime())) / total;
    const timeLeft = (activeStatus.endAt - new Date().getTime()) / 1000;

    // console.log(`${interaction.id} is %${progress * 100} complete with ${timeLeft} left.`)
    // console.log(`of ${total / 1000} seconds`)
    return(
      <ScInteraction >
        <ScCooldownButton>
          <ScLabel>{interaction.label}</ScLabel>
          <ProgressBar startProgress={progress} duration={timeLeft} />
        </ScCooldownButton>
      </ScInteraction>
    );
  }else{
    return(
      <ScInteraction onClick={() => onClickHandler && onClickHandler()} >
        <ScButton>
          <ScLabel>{`${interaction.label}`}</ScLabel>
        </ScButton>
      </ScInteraction>
    );
  }
}
