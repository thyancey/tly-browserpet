import React from 'react';
import styled from 'styled-components';
import { StatBar } from './stat-bar';
import { useAppSelector } from '../../services/hooks';
import { selectActivePetStats } from '../../services/petstore';

const ScStats = styled.div`
  width:100%;
`;

export const StatGroup = () => {
  const activeStats = useAppSelector(selectActivePetStats);

  return (
    <ScStats>
      {activeStats.map((s, idx) => (
        <StatBar 
          key={idx}
          label={s.label}
          max={s.max}
          value={s.currentValue}
        />
      ))}
    </ScStats>
  )
}
