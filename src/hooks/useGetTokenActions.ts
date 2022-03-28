import {useDispatch} from "react-redux";
import {useCallback} from "react";

export default function useGetTokenAction() {
  const dispatch = useDispatch()

  const getToken = useCallback((params: any) => {
    return null
  }, [dispatch])

  return {getToken}
}
