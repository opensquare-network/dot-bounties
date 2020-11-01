import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { ksmHeadNumberSelector } from "../../store/reducers/ksmSlice";
import { dotHeadNumberSelector } from "../../store/reducers/dotSlice";

const Wrapper = styled.ul`
  display: flex;
  font-size: 13px;
  color: #000000;
  line-height: 18px;
  
  li {
    label,
    span:not(.producer) {
      opacity: 0.72;
    }

    span {
      margin-left: 6px;
    }
    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }

`

export default function HeightInfo() {
  const ksmHeadNumber = useSelector(ksmHeadNumberSelector)
  const dotHeadNumber = useSelector(dotHeadNumberSelector)

  return (
    <Wrapper>
      <li>
        <label>Kusama:</label>
        <span>{ksmHeadNumber}</span>
      </li>
      <li>
        <label>Polkadot:</label>
        <span>{dotHeadNumber}</span>
      </li>
    </Wrapper>
  )
}
