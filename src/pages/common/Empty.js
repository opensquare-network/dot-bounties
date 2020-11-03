import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import React from "react";

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  i {
    font-size: 24px;
  }
`

export default function Empty({ children }) {
  return (
    <EmptyWrapper>
      <Icon name='sticky note outline' />
      <p>{children}</p>
    </EmptyWrapper>
  )
}
