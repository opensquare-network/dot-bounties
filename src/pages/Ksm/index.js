import { useDispatch } from "react-redux";
import React, { useEffect } from 'react'
import {
  fetchBounties,
  fetchKsmBountyCount,
  fetchKsmBountyDescriptions,
  fetchKsmProperties
} from "../../store/reducers/ksmSlice";
import Bounties from "../common/Bounties";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchKsmBountyCount())
    dispatch(fetchBounties())
    dispatch(fetchKsmProperties())
    dispatch(fetchKsmBountyDescriptions())
  }, [dispatch])

  return (
    <Bounties/>
  )
}
