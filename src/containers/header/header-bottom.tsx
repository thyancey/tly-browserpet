import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectActiveInfo } from '../../services/petstore';
import { getColor } from '../../themes';

const ScContainer = styled.div`
  width:100%;
  height:100%;
  
  color:${getColor('white')};
  background-color: ${getColor('blue')};
  border:.5rem solid ${getColor('white')};
  border-radius: 1rem;
  position:relative;
  padding:0rem 1rem;

  display:flex;
  box-shadow: .25rem .25rem .25rem .05rem ${getColor('grey')};

  >div{
    display:inline-block;
    vertical-align:middle;
    height:100%;
  }
`;

const ScLabel = styled.div`
  flex:1;

  >p{
    font-style:italic;
  }

  >h4{
    margin-top:-.5rem;
    margin-bottom: -.5rem;
  }
`

const ScPetLevel = styled.div`
  text-align:right;
  color: ${getColor('white')};
  
  >h4{
    margin:0;
    line-height: 5rem;
  }
`;

const ScPetName = styled.h4`
  text-align:left;
  display:inline-block;
  flex:1;
`;


const ScBornOn = styled.p`
  
`

const getDateLabel = (epoch?: number) => {
  if(!epoch){
    return null;
  }else{
    const date = new Date(epoch);    
    return date.toLocaleString("en-us");
  }
};

export const HeaderBottom = () => {
  const petInfo = useSelector(selectActiveInfo);

  return (
    <ScContainer>
      {petInfo && (
        <>
          <ScLabel>
            <ScPetName>{petInfo.name}</ScPetName>
            <ScBornOn>{`born on: ${getDateLabel(petInfo.bornOn)}`}</ScBornOn>
          </ScLabel>
          <ScPetLevel>
            <h4>{`Level: ${petInfo.level}`}</h4>
          </ScPetLevel>
        </>
      )}
    </ScContainer>
  )
}
