import Bounties from "../common/Bounties";
import React from "react";
import useFetchDot from "./useFetchDot";

export default function Dot() {
  useFetchDot()

  return (
    <Bounties token='dot'/>
  )
}
