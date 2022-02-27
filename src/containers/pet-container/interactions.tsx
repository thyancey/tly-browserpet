import React from 'react';
import styled from 'styled-components';

import { selectActiveInteractionDefinitions, addInteractionEvent, selectActiveInteractionStatus, removeInteractionEvent, changeStatEvent } from '../../services/petstore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../themes';
import { PetInteractionDefinition } from '../../types';
import { Dispatch } from '@reduxjs/toolkit';
import { pingStore } from '../../services/ui';
import { InteractionButton } from './interaction-button';

const ScContainer = styled.div`
  color:${getColor('black')};
  position:absolute;
  left:0;
  top:0;
  
  border: .25rem dashed white;
  padding: 1rem;
  border-bottom-right-radius: 2rem;
  border-left:0;
  border-top:0;
`;

const ScInteractions = styled.ul`
  max-width: 14rem;
  text-align: left;
`;


export const Interactions = () => {
  const interactionDefs = useSelector(selectActiveInteractionDefinitions, shallowEqual);
  const interactionStatus = useSelector(selectActiveInteractionStatus, shallowEqual);

  // thunk madness, cause I don't know how else to do this.
  const dispatch = useDispatch();
  const addTemporaryInteraction = (interaction: PetInteractionDefinition) => {
    dispatch((thunkDispatch: Dispatch) => {
      thunkDispatch(addInteractionEvent({ interaction: interaction, time: new Date().getTime() }));
      thunkDispatch(changeStatEvent({ changedStats: interaction.changeStats, time: new Date().getTime() }));
      thunkDispatch(pingStore({ time: new Date().getTime(), doSave: true}));
      if(interaction.cooldown){
        window.setTimeout(() => {
          thunkDispatch(removeInteractionEvent(interaction.id))
        }, interaction.cooldown);
      }
    });
  }

  return (
    <ScContainer>
      <ScInteractions>
        {interactionDefs.map((interaction, i) => (
          <InteractionButton
            key={interaction.id}
            activeStatus={interactionStatus.find(iS => iS.id === interaction.id)}
            interaction={interaction}
            onClickHandler={() => addTemporaryInteraction(interaction)} />
        ))}
      </ScInteractions>
    </ScContainer>
  )
}
