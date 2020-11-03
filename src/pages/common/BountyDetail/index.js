import React from "react";
import styled from 'styled-components'
import Identity from "../Identity";
import { getKsmApi } from "../../../services/ksmApi";
import { getDotApi } from "../../../services/dotApi";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../../store/reducers/ksmSlice";
import { dotPrecisionSelector } from "../../../store/reducers/dotSlice";
import { toPrecision } from "../../../utils";

const ItemsWrapper = styled.div`
  ul {
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

  return (
    <ItemsWrapper>
      <ul>
        <li>
          <div className="name">Bounty Index</div>
          <div className="value">{bounty.index}</div>
        </li>
        <li>
          <div className="name">Description</div>
          <div className="value">{bounty.description}</div>
        </li>
        <li>
          <div className="name">Proposer</div>
          <div className="value">
            <Identity api={api} addr={bounty.detail.proposer} token={token} />
          </div>
        </li>
        <li>
          <div className="name">Value</div>
          <div className="value">{toPrecision(bounty.detail?.value, precision, false)} {tokenName}</div>
        </li>
        <li>
          <div className="name">Fee</div>
          <div className="value">{toPrecision(bounty.detail?.fee, precision, false)} {tokenName}</div>
        </li>
        <li>
          <div className="name">Curator Deposit</div>
          <div className="value">
            {toPrecision(bounty.detail?.curatorDeposit, precision, false)} {tokenName}
          </div>
        </li>
        <li>
          <div className="name">Status</div>
          <div className="value">{bounty.status}</div>
        </li>
        {
          showCurator ? (
            <li>
              <div className="name">Curator</div>
              <div className="value">
                <Identity
                  api={api}
                  token={token}
                  addr={Object.values(bounty.detail?.status)[0].curator} />
              </div>
            </li>
          ) : null
        }
        {
          showUpdateDue ? (
            <li>
              <div className="name">Update Due</div>
              <div className="value">{Object.values(bounty.detail?.status)[0].updateDue}</div>
            </li>
          ) : null
        }
        {
          showBeneficiary ? (
            <li>
              <div className="name">Beneficiary</div>
              <div className="value">
                <Identity
                  token={token}
                  api={api}
                  addr={Object.values(bounty.detail?.status)[0].beneficiary} />
              </div>
            </li>
          ) : null
        }
        {
          showUnlockAt ? (
            <li>
              <div className="name">Unlock At</div>
              <div className="value">
                {Object.values(bounty.detail?.status)[0].unlockAt}
              </div>
            </li>
          ) : null
        }
      </ul>
    </ItemsWrapper>
  )
}
