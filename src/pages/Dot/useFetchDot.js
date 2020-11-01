import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDotBounties,
  fetchDotBountyCount,
  fetchDotBountyDescriptions,
  fetchDotProperties
} from "../../store/reducers/dotSlice";

export default function useFetchDot() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDotBounties())
    dispatch(fetchDotBountyCount())
    dispatch(fetchDotBountyDescriptions())
    dispatch(fetchDotProperties())
  }, [dispatch])
}
