import React from 'react';
import styled from 'styled-components';
import { StatBar } from './stat-bar';
import { selectActiveDeltaStats } from '../../services/petstore';
import { useSelector } from 'react-redux';

const ScStats = styled.div`
  width:100%;
`;

export const StatGroup = () => {
  const activeStats = useSelector(selectActiveDeltaStats);

  return (
    <ScStats>
      {activeStats.map((s, idx) => (
        <StatBar 
          key={idx}
          label={s.label}
          max={s.max}
          value={s.value}
        />
      ))}
    </ScStats>
  )
}
