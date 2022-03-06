import React from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { selectActiveInteractionDefinitions, addInteractionEvent, selectActiveInteractionStatus, removeInteractionEvent, changeStatEvent, selectRenderedDeltaStats } from '../../../services/petstore';
import { PetInteractionDefinition } from '../../../types';
import { pingStore } from '../../../services/ui';
import { InteractionButton } from './interaction-button';

const ScInteractions = styled.ul`
  border-bottom: .25rem dashed black;
  display: flex;
  flex-wrap: wrap;

  >li{
    margin:.5rem;
    margin-left: .25rem;
    &:first-child{
      margin-left: .5rem;
    }
    flex: 1;
    list-style:none;
  }
`;

export const Interactions = () => {
  const interactionDefs = useSelector(selectActiveInteractionDefinitions, shallowEqual);
  const interactionStatus = useSelector(selectActiveInteractionStatus, shallowEqual);
  const activeStats = useSelector(selectRenderedDeltaStats);

  // thunk madness, cause I don't know how else to do this.
  const dispatch = useDispatch();
  const addTemporaryInteraction = (interaction: PetInteractionDefinition) => {
    const now = new Date().getTime();
    dispatch((thunkDispatch: Dispatch) => {
      thunkDispatch(addInteractionEvent({ interaction: interaction, time: now }));
      thunkDispatch(changeStatEvent({ changedStats: interaction.changeStats, time: now + 1, activeStats: activeStats }));
      // its possible this save is not needed
      // thunkDispatch(pingStore({ time: now, doSave: true}));
      if(interaction.cooldown){
        window.setTimeout(() => {
          thunkDispatch(removeInteractionEvent(interaction.id))
        }, interaction.cooldown);
      }
    });
  }

  return (
    <ScInteractions>
      {interactionDefs.map((interaction, i) => (
        <InteractionButton
          key={interaction.id}
          activeStatus={interactionStatus.find(iS => iS.id === interaction.id)}
          interaction={interaction}
          onClickHandler={() => addTemporaryInteraction(interaction)} />
      ))}
    </ScInteractions>
  )
}
