import React from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../../themes';
import { InteractionCooldownStatus, PetInteractionDefinition } from '../../../types';
import { ProgressBar } from './progress-bar';

type ScInteractionProps = {
  isEnabled?: boolean
}

const ScInteraction = styled.li<ScInteractionProps>`
  text-align:center;

  ${p => !p.isEnabled && css`
    opacity: .5;
    pointer-events:none;
  `}
`;

const ScButton = styled.div`
  font-weight:bold;
  font-size: 2rem;

  padding:1rem .5rem;

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
  cooldownStatus?: InteractionCooldownStatus,
  interaction: PetInteractionDefinition,
  isEnabled: boolean,
  onClickHandler?: Function
}

export const InteractionButton = ({cooldownStatus, isEnabled, interaction, onClickHandler}: InteractionButtonProps) => {
  if(cooldownStatus){
    const total = cooldownStatus.endAt - cooldownStatus.startAt; 
    const progress = (total - (cooldownStatus.endAt - new Date().getTime())) / total;
    const timeLeft = (cooldownStatus.endAt - new Date().getTime()) / 1000;

    return(
      <ScInteraction isEnabled={isEnabled}>
        <ScCooldownButton>
          <ScLabel>{interaction.label}</ScLabel>
          <ProgressBar startProgress={progress} duration={timeLeft} />
        </ScCooldownButton>
      </ScInteraction>
    );
  }else{
    return(
      <ScInteraction isEnabled={isEnabled} onClick={() => onClickHandler && onClickHandler()} >
        <ScButton>
          <ScLabel>{`${interaction.label}`}</ScLabel>
        </ScButton>
      </ScInteraction>
    );
  }
}
