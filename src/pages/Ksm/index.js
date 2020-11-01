import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import {
  fetchBounties,
  fetchKsmBountyCount,
  fetchKsmBountyDescriptions,
  fetchKsmProperties
} from "../../store/reducers/ksmSlice";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchKsmBountyCount())
    dispatch(fetchBounties())
    dispatch(fetchKsmProperties())
    dispatch(fetchKsmBountyDescriptions())
  }, [dispatch])

  return 'home page'
}
