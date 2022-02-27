import React from 'react';
import { getColor } from '../../themes/';

import styled from 'styled-components';
import { StatGroup } from './stat-group';
import { selectActiveInfo } from '../../services/petstore';
import { useSelector } from 'react-redux';
import { Interactions } from './interactions';

const ScContainer = styled.div`
  position:absolute;
  left:0;
  right:0;
  top:-.5rem;
  bottom:0;

  background-color:${getColor('green')};
  border:.5rem solid ${getColor('white')};
  border-radius:2rem;
  overflow:hidden;

  box-shadow: .25rem .25rem .55rem .45rem ${getColor('grey')};
`

const ScPetInfo = styled.div`
  width:100%;
  height:16rem;

  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: 0.25rem .5rem .5rem .5rem;
  font-weight:500;
  padding:2rem;
  
  color: black;
  

  overflow-y:auto;

  hr{
    border-color:${getColor('blue')};
    border-style:dashed;
    margin-top:.5rem;
    margin-bottom:.5rem;

    margin-left:10%;
    width:80%;
  }
`

const ScBio = styled.div`
  width:100%;
`;

const ScBioName = styled.h4`
  margin-top:1rem;
  margin-bottom:.5rem;
`;

const ScBioInfo = styled.p`
  margin-top:1rem;
  padding-left:1rem;
`;

const ScInteractions = styled.div`
  min-height:5rem;
  width:100%;
`;

export const Footer = () => {
  const petInfo = useSelector(selectActiveInfo);
  if(!petInfo) return null;

  return (
    <ScContainer>
      <ScInteractions>
        <Interactions />
      </ScInteractions>
      <ScPetInfo>
        <StatGroup />
        <hr/>
        <ScBio>
          <ScBioName>{'Description'}</ScBioName>
          <ScBioInfo>{petInfo.bio}</ScBioInfo>
        </ScBio>
      </ScPetInfo>
    </ScContainer>
  )
}
