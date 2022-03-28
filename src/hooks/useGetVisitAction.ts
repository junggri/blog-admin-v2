import {useDispatch} from "react-redux";
import {useCallback} from "react";

export default function useGetVisitAction() {
  const dispatch = useDispatch()

  const getDashBoard = useCallback((params: any) => {

    return false
  }, [dispatch])

  return {getDashBoard}
}
