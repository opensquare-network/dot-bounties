import styled from 'styled-components'
import React from "react";
import { toPrecision } from "../../utils";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../store/reducers/ksmSlice";
import Identity from "./Identity";
import { getKsmApi } from "../../services/ksmApi";
import { useHistory } from 'react-router'
import { dotPrecisionSelector } from "../../store/reducers/dotSlice";
import { getDotApi } from "../../services/dotApi";

const Wrapper = styled.section`
  margin-bottom: 8px;

  background: #FFFFFF;
  padding: 16px 24px;

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
      font-size: 16px;
      line-height: 32px;
      margin-bottom: 10px;
      cursor: pointer;
      color: #1D253C;
      &:hover {
        color: #00C6B9;
      }
    }
    
    span {
      font-weight: bold;
      font-size: 16px;
      line-height: 32px;
      color: #00C6B9;
      
      display: inline-flex;
      min-width: 150px;
      justify-content: flex-end;
    }
  }
  
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      font-size: 12px;
      &:not(:last-of-type) {
        margin-right: 33px;
      }
    
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
  const isKsm = token === 'ksm'
  const precision = useSelector(isKsm ? ksmPrecisionSelector : dotPrecisionSelector)
  const api = isKsm ? getKsmApi() : getDotApi()
  const history = useHistory()

  return (
    <Wrapper>
      <header>
        <h3 onClick={() => {
          history.push(`/${token}/${bounty.index}`)
        }}>{bounty.description}</h3>
        <span>{toPrecision(bounty.detail?.value, precision, false)} {isKsm ? 'KSM' : 'DOT'}</span>
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
          {
            bounty.detail.status?.Active?.curator ?
              <Identity api={api} addr={bounty.detail.status?.Active?.curator} token={token} /> : null
          }
        </li>
      </ul>
    </Wrapper>
  )
}
