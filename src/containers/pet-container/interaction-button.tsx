import React from 'react';
import styled from 'styled-components';
import { getColor, mixinColorBubble } from '../../themes';
import { ActiveInteractionStatus, PetInteractionDefinition } from '../../types';
import { ProgressBar } from './progress-bar';


const ScInteraction = styled.li`
  display:inline-block;
  list-style:none;
`;

const ScButton = styled.div`
  font-weight:bold;
  font-size: 2rem;

  ${mixinColorBubble('purple')}
  padding:1rem 1.5rem;

  position:relative;
  overflow: hidden;
  cursor:pointer;
`;

const ScCooldownButton = styled(ScButton)`
  ${mixinColorBubble('red')}
  color: ${getColor('black')};
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
