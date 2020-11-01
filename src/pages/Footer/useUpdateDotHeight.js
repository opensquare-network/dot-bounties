import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDotApi } from "../../services/dotApi";
import { setDotHeadNumber } from "../../store/reducers/dotSlice";

const useUpdateDotHeight = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let unsubscribeNewHead = null
    getDotApi().rpc.chain.subscribeNewHeads(head => {
      dispatch(setDotHeadNumber(head.number.toNumber()))
    }).then(result => (unsubscribeNewHead = result))

    return () => {
      if (unsubscribeNewHead) {
        unsubscribeNewHead()
      }
    }
  }, [dispatch])
}

export default useUpdateDotHeight
