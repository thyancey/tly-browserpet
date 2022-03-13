import React from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { selectActiveInteractionDefinitions, addNewInteractionEvent, selectActiveInteractionStatus, removeInteractionEvent, selectActiveInteractionDetail } from '../../../services/petstore';
import { PetInteractionDefinition } from '../../../types';
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
    flex: 1 auto;
    list-style:none;
  }
`;

export const Interactions = () => {
  const interactionDetails = useSelector(selectActiveInteractionDetail, shallowEqual);

  // thunk madness, cause I don't know how else to do this.
  const dispatch = useDispatch();
  const addTemporaryInteraction = (interaction: PetInteractionDefinition) => {
    const now = new Date().getTime();
    dispatch((thunkDispatch: Dispatch) => {
      thunkDispatch(addNewInteractionEvent({ 
        interaction: interaction, 
        time: now 
      }));
      if(interaction.cooldown){
        window.setTimeout(() => {
          thunkDispatch(removeInteractionEvent(interaction.id))
        }, interaction.cooldown);
      }
    });
  }

  return (
    <ScInteractions>
      {interactionDetails.map((iDetail, i) => (
        <InteractionButton
          key={iDetail.id}
          activeStatus={iDetail.activeStatus}
          isEnabled={iDetail.enabled}
          interaction={iDetail.definition}
          onClickHandler={() => addTemporaryInteraction(iDetail.definition)} />
      ))}
    </ScInteractions>
  )
}
