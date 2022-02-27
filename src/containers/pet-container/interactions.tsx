import React from 'react';
import styled, { css } from 'styled-components';

import { selectActiveInteractionDefinitions, addInteractionEvent, selectActiveInteractionStatus, removeInteractionEvent, changeStatEvent } from '../../services/petstore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getColor, mixinColorBubble } from '../../themes';
import { PetInteractionDefinition } from '../../types';
import { Dispatch } from '@reduxjs/toolkit';
import { pingStore } from '../../services/ui';
import { ProgressBar } from './progress-bar';

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

const ScInteraction = styled.li`
  display:inline-block;
  list-style:none;
  color:black;
  
  font-weight:bold;
  font-size: 2rem;
  
  ${mixinColorBubble('green')}
  padding:.5rem 1rem;
`;

const ScActiveInteraction = styled(ScInteraction)`
  ${mixinColorBubble('red')}
`;

const ScStats = styled.ul`
  
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
        {interactionDefs.map((interaction, i) => {
          const activeStatus = interactionStatus.find(iS => iS.id === interaction.id);
          if(activeStatus){
            const total = activeStatus.endAt - activeStatus.startAt; 
            const progress = (total - (activeStatus.endAt - new Date().getTime())) / total;
            const timeLeft = (activeStatus.endAt - new Date().getTime()) / 1000;

            console.log(`${interaction.id} is %${progress * 100} complete with ${timeLeft} left.`)
            console.log(`of ${total / 1000} seconds`)
            return(
              <ScActiveInteraction key={interaction.id} >
                {interaction.label}
                <ProgressBar startProgress={progress} duration={timeLeft} />
              </ScActiveInteraction>
            );
          }else{
            return(
              <ScInteraction key={interaction.id} onClick={() => addTemporaryInteraction(interaction)} >
                {`${interaction.label}`}
              </ScInteraction>
            );
          }
        })}
      </ScInteractions>
      <ScStats>
      </ScStats>
    </ScContainer>
  )
}
