import React from "react";
import styled from 'styled-components'
import Identity from "../Identity";
import { getKsmApi } from "../../../services/ksmApi";
import { getDotApi } from "../../../services/dotApi";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../../store/reducers/ksmSlice";
import { dotPrecisionSelector } from "../../../store/reducers/dotSlice";
import { toPrecision } from "../../../utils";
import State from "./State";

const ItemsWrapper = styled.div`
  & > ul {
    background: #FFF;
    border: 1px solid #dbdbdb;
    font-size: 12px;
    
    li {
      display: flex;
      padding: 10px 16px;
      
      div.name {
        min-width: 200px;
      }
      
      &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
      }
    }
  }
  
  & > section {
    margin-top: 16px;
  }
`;

export default function BountyDetail({ bounty, token }) {
  const isKsm = token === 'ksm'

  const precision = useSelector(isKsm ? ksmPrecisionSelector : dotPrecisionSelector)
  const tokenName = isKsm ? 'KSM' : 'DOT'
  const showCurator = ['CuratorProposed', 'Active', 'PendingPayout'].includes(bounty.status)
  const api = isKsm ? getKsmApi() : getDotApi()
  const showUpdateDue = ['Active'].includes(bounty.status)
  const showBeneficiary = ['PendingPayout'].includes(bounty.status)
  const showUnlockAt = ['PendingPayout'].includes(bounty.status)

  const items = [
    {
      name: 'Bounty Index',
      value: bounty.index
    },
    {
      name: 'Description',
      value: bounty.description
    },
    {
      name: 'Proposer',
      value: <Identity api={api} addr={bounty.detail.proposer} token={token} />
    },
    {
      name: 'Bond',
      value: `${toPrecision(bounty.detail?.bond, precision, false)} ${tokenName}`
    },
    {
      name: 'Value',
      value: `${toPrecision(bounty.detail?.value, precision, false)} ${tokenName}`
    },
    {
      name: 'Fee',
      value: `${toPrecision(bounty.detail?.fee, precision, false)} ${tokenName}`
    },
    {
      name: 'Curator Deposit',
      value: `${toPrecision(bounty.detail?.curatorDeposit, precision, false)} ${tokenName}`
    },
    {
      name: 'Status',
      value: bounty.status
    },
  ]

  if (showCurator) {
    items.push({
      name: 'Curator',
      value: <Identity
        api={api}
        token={token}
        addr={Object.values(bounty.detail?.status)[0].curator} />
    })
  }

  if (showUpdateDue) {
    items.push({
      name: 'Update Due',
      value: Object.values(bounty.detail?.status)[0].updateDue
    })
  }

  if (showBeneficiary) {
    items.push({
      name: 'Beneficiary',
      value: Object.values(bounty.detail?.status)[0].beneficiary
    })
  }

  if (showUnlockAt) {
    items.push({
      name: 'Unlock At',
      value: Object.values(bounty.detail?.status)[0].unlockAt
    })
  }

  return (
    <ItemsWrapper>
      <ul>
        {
          items.map((item, idx) => {
            return (
              <li key={idx}>
                <div className="name">{item.name}</div>
                <div className="value">{item.value}</div>
              </li>
            )
          })
        }
      </ul>
      <State bounty={bounty} token={token} />
    </ItemsWrapper>
  )
}
