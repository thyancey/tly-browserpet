import React from 'react';
import styled, { css } from 'styled-components';

import { selectActiveInteractionDefinitions } from '../../services/petstore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getColor, mixinColorBubble } from '../../themes';
import { addInteractionEvent, selectActiveInteractionStatus, selectActiveStatEffects } from '../../services/ui';

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

type ScInteractionProps = {
  isActive?: boolean
}
const ScInteraction = styled.li<ScInteractionProps>`
  display:inline-block;
  list-style:none;
  color:black;
  
  font-weight:bold;
  font-size: 2rem;
  
  ${mixinColorBubble('purple')}
  padding:.5rem 1rem;

  ${p => p.isActive && css`
    background-color: ${getColor('red')};
  `}
`;

const ScStats = styled.ul`
  
`;

type ScStatProps = {
  isPositive?: boolean,
  isActive?: boolean
};

const ScStat = styled.li<ScStatProps>`
  display:inline-block;
  list-style:none;
  color:black;
  
  font-weight:bold;
  font-size: 2rem;

  background-color:black;
  padding: 1rem 2rem;
  margin:1rem;

  opacity: ${p => p.isActive ? 1 : .5};
  
  color: ${p => p.isPositive ? getColor('green') : getColor('red')};

  transition: all .2s;
`;


export const Interactions = () => {
  const interactionDefs = useSelector(selectActiveInteractionDefinitions, shallowEqual);
  const interactionStatus = useSelector(selectActiveInteractionStatus, shallowEqual);
  const statEffects = useSelector(selectActiveStatEffects, shallowEqual);
  const dispatch = useDispatch();

  return (
    <ScContainer>
      <ScInteractions>
        {interactionDefs.map((interaction, i) => (
          <ScInteraction key={interaction.id} isActive={!!interactionStatus.find(iS => iS.id === interaction.id)} onClick={() => dispatch(addInteractionEvent(interaction))} >
            {`${interaction.label}`}
          </ScInteraction>
        ))}

      </ScInteractions>
      <ScStats>
        {statEffects.map((statEffect, i) => (
          <ScStat isPositive={(statEffect.perSecond > 0)} isActive={(statEffect.isActive)} key={statEffect.statId} >
            <span>{`${statEffect.statId}: `}</span>
            <span>{`${(statEffect.perSecond > 0) ? '+' : '-'}${statEffect.perSecond}`}</span>
            <p>{`delay: ${Math.round((statEffect.startAt - statEffect.startDelayAt) / 1000)} seconds`}</p>
            <p>{`${Math.round((statEffect.endAt - statEffect.startAt) / 1000)} seconds`}</p>
          </ScStat>
        ))}
      </ScStats>
    </ScContainer>
  )
}
