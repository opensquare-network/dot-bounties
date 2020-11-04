import { useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { dotNormalizedBountiesSelector } from "../../store/reducers/dotSlice";
import Empty from "../common/Empty";
import BountyDetail from "../common/BountyDetail";

export default function DotDetail() {
  const [bounty, setBounty] = useState(null)
  const bounties = useSelector(dotNormalizedBountiesSelector)
  const { index } = useParams()

  useEffect(() => {
    const b = bounties.find(b => b.index === parseInt(index))
    setBounty(b)
  }, [bounties, index])

  if (!bounty) {
    return <Empty>No bounty found</Empty>
  }

  return (
    <BountyDetail bounty={bounty} token="dot" />
  )
}
