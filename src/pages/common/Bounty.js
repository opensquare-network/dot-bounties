import styled from 'styled-components'
import React from "react";
import { toPrecision } from "../../utils";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../store/reducers/ksmSlice";
import Identity from "./Identity";
import { getKsmApi } from "../../services/ksmApi";

const Wrapper = styled.section`
  background: #FFFFFF;
  padding: 16px 24px;

  border: 1px solid #EEEEEE;
  box-sizing: border-box;

  box-shadow: 0px 4px 24px rgba(29, 37, 60, 0.04);
  border-radius: 8px;
  
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

export default function Bounty({ bounty }) {
  const precision = useSelector(ksmPrecisionSelector)
  console.log(bounty)

  return (
    <Wrapper>
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
          <Identity api={getKsmApi()} addr={bounty.detail.status?.Active.curator}/>
        </li>
      </ul>
    </Wrapper>
  )
}
