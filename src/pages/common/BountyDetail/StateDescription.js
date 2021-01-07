import React from "react";
import styled from 'styled-components'
import { states } from './constants'
import Identity from "../Identity";
import { getKsmApi } from "../../../services/ksmApi";
import { getDotApi } from "../../../services/dotApi";

const desc = {
  Proposed: 'Bounty is propsed, and the proposer deposit the bond.',
  Approved: 'Bounty proposal is approved by the council. The bond will return to the proposer.',
  Funded: 'The bounty is funded.',
  CuratorProposed: `After the council propose the curator, the bounty become 'CuratorProposed'. The curator will decide the bounty implementor and judge the work.`,
  Active: `After the curator accept the bounty assignment from the Council and deposit half of the fee, the bounty become 'Active'.`,
  PendingPayout: `After the curator award the beneficiary for the completed work, the bounty become 'PendingPayout'`
}

const stateKeys = {
  CuratorProposed: ['curator'],
  Active: ['curator', 'updateDue'],
  PendingPayout: ['curator', 'beneficiary', 'unlockAt']
}

const Wrapper = styled.div`
  h3 {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 500;
    color: #1D253C;
  }
  
  p {
    color: #1D253C;
  }
  
  li {
    color: #1D253C;
    label {
      display: inline-block;
      min-width: 80px;
      color: rgba(29, 37, 60, 0.64);
    }
  }
`

export default function StateDescription({ state, bounty, token }) {
  const isKsm = token === 'ksm'
  const api = isKsm ? getKsmApi() : getDotApi()
  const statusIndex = states.findIndex(s => s === bounty.status)
  const targetIndex = states.findIndex(s => s === state)

  const statusParams = Object.values(bounty.detail.status)[0] || {}
  const normalizedParams = Object.entries(statusParams).map(([key, value]) => {
    if (['curator', 'beneficiary'].includes(key)) {
      return {
        key,
        value: <Identity api={api} addr={value} token={token} />
      }
    } else {
      return {
        key, value
      }
    }
  })
  const filteredParams = normalizedParams.filter(p => (stateKeys[state] || []).includes(p.key))

  return <Wrapper>
    <h3>{state}:</h3>
    <p>
      {desc[state]}
    </p>

    {
      targetIndex < 3 || targetIndex > statusIndex ? null : <>
        <h3>Params:</h3>
        <ul>
          {
            filteredParams.map((param, idx) => {
              return (
                <li key={idx}>
                  <label>{param.key}:</label>
                  {param.value}
                </li>
              )
            })
          }
        </ul>
      </>
    }
  </Wrapper>
}
