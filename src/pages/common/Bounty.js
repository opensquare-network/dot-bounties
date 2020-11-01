import styled from 'styled-components'
import React from "react";
import { toPrecision } from "../../utils";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../store/reducers/ksmSlice";
import Identity from "./Identity";
import { getKsmApi } from "../../services/ksmApi";
import { useHistory } from 'react-router'
import { dotPrecisionSelector } from "../../store/reducers/dotSlice";

const Wrapper = styled.section`
  background: #FFFFFF;
  padding: 16px 24px;
  cursor: pointer;

  border: 1px solid #EEEEEE;
  box-sizing: border-box;

  border-radius: 8px;
  &:hover {
    box-shadow: 0px 4px 24px rgba(29, 37, 60, 0.08);
  }
  
  header {
    display: flex;
    justify-content: space-between;
    
    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 32px;
      margin-bottom: 10px;

      color: #1D253C;
    }
    
    span {
      font-weight: bold;
      font-size: 18px;
      line-height: 32px;
      color: #00C6B9;
    }
  }
  
  ul {
    display: flex;
    li {
      &:not(:first-of-type) {
        margin-left: 33px;
      }
    
      font-size: 14px;
      line-height: 24px;
      label {
        color: rgba(29, 37, 60, 0.24);
      }
      span {
        margin-left: 8px;
        color: rgba(29, 37, 60, 0.64);
      }
    }
  }
  
`

export default function Bounty({ bounty, token }) {
  const precision = useSelector(token === 'ksm' ? ksmPrecisionSelector : dotPrecisionSelector)
  const history = useHistory()

  return (
    <Wrapper onClick={() => {
      history.push(`/ksm/${bounty.index}`)
    }}>
      <header>
        <h3>{bounty.description}</h3>
        <span>{toPrecision(bounty.detail?.value, precision, false)} KSM</span>
      </header>
      <ul>
        <li>
          <label>Index:</label>
          <span>{bounty.index}</span>
        </li>
        <li>
          <label>Status:</label>
          <span>{bounty.status}</span>
        </li>
        <li>
          <label>Fee:</label>
          <span>{toPrecision(bounty.detail?.fee, precision, false)} KSM</span>
        </li>
        <li>
          <label>Curator:</label>
          <Identity api={getKsmApi()} addr={bounty.detail.status?.Active.curator} />
        </li>
      </ul>
    </Wrapper>
  )
}
