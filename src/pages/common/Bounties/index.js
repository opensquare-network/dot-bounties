import { useSelector } from "react-redux";
import { ksmNormalizedBountiesSelector } from "../../../store/reducers/ksmSlice";
import styled from "styled-components"
import React from "react";
import Bounty from "../Bounty";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

export default function Bounties() {
  const bounties = useSelector(ksmNormalizedBountiesSelector)

  return (
    <Wrapper>
      <ul>
        {
          bounties.map((bounty, idx) => {
            return <li key={idx}>
              <Bounty bounty={bounty}/>
            </li>
          })
        }
      </ul>
    </Wrapper>
  )
}
