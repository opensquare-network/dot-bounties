import { useDispatch } from "react-redux";
import { getKsmApi } from "../../services/ksmApi";
import { setKsmHeadNumber } from "../../store/reducers/ksmSlice";
import { useEffect } from "react";

const useUpdateKsmHeight = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let unsubscribeNewHead = null
    getKsmApi().rpc.chain.subscribeNewHeads(head => {
      dispatch(setKsmHeadNumber(head.number.toNumber()))
    }).then(result => (unsubscribeNewHead = result))

    return () => {
      if (unsubscribeNewHead) {
        unsubscribeNewHead()
      }
    }
  }, [dispatch])
}

export default useUpdateKsmHeight
