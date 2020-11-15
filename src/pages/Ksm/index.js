import React from 'react'
import Bounties from "../common/Bounties";
import { useSelector } from "react-redux";
import { ksmLoadingSelector } from "../../store/reducers/ksmSlice";
import LoadingWithText from "../common/LoadingWithText";
import styled from 'styled-components'

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

export default function Home() {
  const ksmLoading = useSelector(ksmLoadingSelector)

  if (ksmLoading) {
    return (
      <LoadingWrapper>
        <LoadingWithText text="Loading kusama bounties" />
      </LoadingWrapper>
    )
  }

  return (
    <Bounties token='ksm' />
  )
}
