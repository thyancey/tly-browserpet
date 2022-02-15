import React from 'react';
import { getColor } from '../../themes/';

import styled, { css } from 'styled-components';
import { getShade } from '../../themes';
import { round } from '../../util/tools';

const ScContainer = styled.div`
  display:inline-block;
  width:50%;
  padding:0rem .5rem;
`;

const ScLabel = styled.h4`
  font-size: 1rem;
`;

const ScBar = styled.div`
  position:relative;
  border:.5rem solid ${getColor('white')};
  border-radius: 1rem;
  overflow:hidden;
  padding:.25rem .5rem;
  text-align:center;
  background-color: ${getColor('white')};

  box-shadow: 0px -2px 4px ${getShade('white', -40)};
`;

const ScBarValue = styled.span`
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  z-index:1;
`;

const ScBarFill = styled.div`
  position:absolute;
  top:0;
  left:0;
  height:100%; 
  transition: width .3s ease-in-out, background-color .5s ease-in-out;
  background-color: ${getColor('blue')};
`;

type StatBarProps = {
  label: string,
  percent: number,
  max: number,
  value: number
};

export const StatBar = ({label,percent, max, value}: StatBarProps) => {
  const bigPercent = percent * 100;
  const progressLabel = `${round(value)} / ${max}`;
  // const progressLabel = `${round(value)} / ${max} (${round(bigPercent)}%)`;
  // const progressLabel = `${round(bigPercent)}%`;

  return (
    <ScContainer>
      <ScLabel>{label.toLocaleUpperCase()}</ScLabel>
      <ScBar>
        <ScBarValue>{progressLabel}</ScBarValue>
        <ScBarFill style={{width:`${bigPercent}%`}} />
      </ScBar>
    </ScContainer>
  )
}
