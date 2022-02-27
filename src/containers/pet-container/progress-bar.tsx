import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColor } from '../../themes';

type ScProgressBarProps = {
  startWidth: string
}

const ScWrapper = styled.div`
  /* position:absolute; */
  left:0;
  top:100%;
  height:2rem;
  width:100%;
  border: .5rem solid ${getColor('white')};
  border-radius: 1rem;
  position:relative;
`;

const ScProgressBg = styled.div`
  background-color:${getColor('red')};
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  z-index:-1;
`;

const ScProgressBar = styled.div<ScProgressBarProps>`
  background-color:${getColor('green')};
  position:absolute;
  height:100%;
  left:0;
  width: ${p => p.startWidth};

  &.full{
    width:100% !important;
  }
  /* z-index:1; */
`

type ProgressBarProps = {
  startProgress: number,
  duration: number
}

export const ProgressBar = ({startProgress, duration}: ProgressBarProps) => {
  const [ loaded, setLoaded ] = useState(false);
  useEffect(() => {
    if(!loaded) {
      window.setTimeout(() => setLoaded(true), 1);
    };
  }, [ loaded, setLoaded ]);

  return (
    <ScWrapper>
      <ScProgressBar 
        startWidth={`${startProgress * 100}%`} 
        className={loaded ? 'full' : ''} 
        style={{ transition: `width ${duration}s linear` }} />
      <ScProgressBg />
    </ScWrapper>
  )
}
