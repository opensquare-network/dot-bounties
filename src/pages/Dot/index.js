import Bounties from "../common/Bounties";
import React from "react";
import { useSelector } from "react-redux";
import { dotLoadingSelector } from "../../store/reducers/dotSlice";
import styled from "styled-components";
import LoadingWithText from "../common/LoadingWithText";

const LoadingWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  section {
    span {
      font-size: 20px !important;
    }
  }
`

export default function Dot() {
  const dotLoading = useSelector(dotLoadingSelector)

  if (dotLoading) {
    return (
      <LoadingWrapper>
        <LoadingWithText text="Loading polkadot bounties" />
      </LoadingWrapper>
    )
  }

  return (
    <Bounties token='dot'/>
  )
}
