import { useSelector } from "react-redux";
import { ksmNormalizedBountiesSelector } from "../../../store/reducers/ksmSlice";
import styled from "styled-components"
import React from "react";
import Bounty from "../Bounty";
import { dotNormalizedBountiesSelector } from "../../../store/reducers/dotSlice";
import { Icon } from "semantic-ui-react";
import Summary from "../Summary";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  i {
    font-size: 24px;
  }

`

export default function Bounties({ token }) {
  const bounties = useSelector(token === 'ksm' ? ksmNormalizedBountiesSelector : dotNormalizedBountiesSelector)

  if (bounties.length <= 0) {
    return (
      <EmptyWrapper>
        <Icon name='sticky note outline' />
        <p>No Bounties</p>
      </EmptyWrapper>
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
