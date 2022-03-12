import React from 'react';
import styled from 'styled-components';
import { HeaderBottom } from './header-bottom';

import { HeaderTop }  from './header-top';
const ScHeader = styled.header`
  position: relative;
  height:8rem;
  z-index:1;

  display:flex;
  flex-direction:column;
`;

const ScTop = styled.div`
  flex: 0 0 3rem;
`;

const ScBottom = styled.div`
  position:relative;
  z-index:1;
  flex: 1;
`;

export const Header = () => {
  return (
    <ScHeader>
      <ScTop>
        <HeaderTop />
      </ScTop>
      <ScBottom>
        <HeaderBottom />
      </ScBottom>
    </ScHeader>
  )
}
