import styled from 'styled-components'
import React from "react";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: #3f3f3f;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  height: 56px;
  color: #ffffff;
`;

export default function Header() {
  return (
    <Wrapper>
      This is the header
    </Wrapper>
  )
}
