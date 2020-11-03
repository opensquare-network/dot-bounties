import React, { useEffect, useState } from "react";
import BountyDetail from "../common/BountyDetail";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { ksmNormalizedBountiesSelector } from "../../store/reducers/ksmSlice";
import Empty from "../common/Empty";

export default function KsmDetail() {
  const [bounty, setBounty] = useState(null)
  const bounties = useSelector(ksmNormalizedBountiesSelector)
  const { index } = useParams()

  useEffect(() => {
    const b = bounties.find(b => b.index === parseInt(index))
    setBounty(b)
  }, [bounties, index])

  if (!bounty) {
    return <Empty>No bounty found</Empty>
  }

  return (
    <BountyDetail bounty={bounty} token="ksm" />
  )
}
