import React from 'react'
import styled from 'styled-components'
import useUpdateKsmHeight from "./useUpdateKsmHeight";
import useUpdateDotHeight from "./useUpdateDotHeight";
import HeightInfo from "./HeightInfo";

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
  height: 22px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(127, 127, 127, 0.4);

  z-index: 999;
`

export default function Footer() {
  useUpdateKsmHeight()
  useUpdateDotHeight()

  return (
    <Wrapper>
      <HeightInfo/>
    </Wrapper>
  )
}
