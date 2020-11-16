import React from "react";
import styled from 'styled-components'
import Identity from "../Identity";
import { getKsmApi } from "../../../services/ksmApi";
import { getDotApi } from "../../../services/dotApi";
import { useSelector } from "react-redux";
import { ksmHeadNumberSelector, ksmPrecisionSelector } from "../../../store/reducers/ksmSlice";
import { dotPrecisionSelector } from "../../../store/reducers/dotSlice";
import { getReadableTime, toPrecision } from "../../../utils";
import State from "./State";
import { Icon, Popup } from "semantic-ui-react";
import { states } from "./constants";

const ItemsWrapper = styled.div`
  & > ul {
    background: #FFF;
    border: 1px solid #EEE;
    font-size: 12px;
    
    li {
      display: flex;
      padding: 10px 16px;
      
      div.name {
        min-width: 200px;
        color: rgba(29, 37, 60, 0.64);;
        
        i {
          margin-left: 2px;
          cursor: pointer;
        }
      }
      
      div.value {
        color: #1D253C;
        span.memo {
          margin-left: 10px;
          color: rgba(29, 37, 60, 0.6)
        }
      }
      
      &:not(:last-of-type) {
        border-bottom: 1px solid #EEE;
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

  const ksmHeadNumber = useSelector(ksmHeadNumberSelector)

  const nowIndex = states.findIndex(s => s === bounty.status)

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
      name: <span>
        Bond
        <Popup
          content='A proposer have to bond some value to propose a bounty. The value will be returned when bounty approved.'
          on='click'
          trigger={<Icon name="question circle outline" />}
        />
      </span>,
      value:
        <span>
        {toPrecision(bounty.detail?.bond, precision, false)} {tokenName}

          {
            nowIndex >= 1 &&
            <span className="memo">(has returned to the proposer)</span>
          }
      </span>
    },
    {
      name:
        <span>
          Value
          <Popup
            content='Will be payed to the beneficiary and curator when the bounty resolved. The amount curator get is equal to fee, while the rest will be payed to the beneficiary.'
            on='click'
            trigger={<Icon name="question circle outline" />}
          />
        </span>,
      value: `${toPrecision(bounty.detail?.value, precision, false)} ${tokenName}`
    },
    {
      name:
        <span>
          Fee
          <Popup
            content='Will be payed to the curator when the bounty resolved.'
            on='click'
            trigger={<Icon name="question circle outline" />}
          />
        </span>,
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
      name:
        <span>
          Curator
          <Popup
            content='Assigned by the council, curator will decide the bounty implementor and judge the work.'
            on='click'
            trigger={<Icon name="question circle outline" />}
          />
        </span>,
      value: <Identity
        api={api}
        token={token}
        addr={Object.values(bounty.detail?.status)[0].curator} />
    })
  }

  if (showUpdateDue) {
    items.push({
      name:
        <span>
          Update Due
          <Popup
            content='After the update due block, the curator maybe unassigned.'
            on='click'
            trigger={<Icon name="question circle outline" />}
          />
        </span>,
      value:
        <span>
          {Object.values(bounty.detail?.status)[0].updateDue}

          <span className="memo">
            ({getReadableTime(Object.values(bounty.detail?.status)[0].updateDue, ksmHeadNumber, 'Due')} left)
          </span>
        </span>
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
