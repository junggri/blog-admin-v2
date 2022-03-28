import {useDispatch} from "react-redux";
import {useCallback} from "react";

export default function useGetMessageActions() {
  const dispatch = useDispatch();

  const getMessage = useCallback(() => {
    return null
  }, [dispatch]);

  return {getMessage};
}
