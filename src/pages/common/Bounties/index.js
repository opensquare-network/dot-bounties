import { useSelector } from "react-redux";
import { ksmNormalizedBountiesSelector } from "../../../store/reducers/ksmSlice";
import styled from "styled-components"
import React from "react";
import Bounty from "../Bounty";
import { dotNormalizedBountiesSelector } from "../../../store/reducers/dotSlice";
import Summary from "../Summary";
import Empty from "../Empty";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

export default function Bounties({ token }) {
  const bounties = useSelector(token === 'ksm' ? ksmNormalizedBountiesSelector : dotNormalizedBountiesSelector)

  if (bounties.length <= 0) {
    return (
      <Empty>No Bounties</Empty>
    )
  }

  return (
    <Wrapper>
      <Summary bounties={bounties} token={token} />
      <ul>
        {
          bounties.map((bounty, idx) => {
            return <li key={idx}>
              <Bounty bounty={bounty} token={token} />
            </li>
          })
        }
      </ul>
    </Wrapper>
  )
}
