import {useDispatch} from "react-redux";
import {useCallback} from "react";
// import {actionFunctions, DeleteIParams, IParams, PostParams} from "reducer/post"

export default function useGetPostActions() {
  const dispatch = useDispatch();

  const getPost = useCallback((...arg: any) => {
    return null
  }, [dispatch]);


  const createPost = useCallback((...arg: any) => {
    return null
  }, [dispatch])


  const deleteContent = useCallback((...arg: any) => {
    return null
  }, [dispatch])

  return {getPost, createPost, deleteContent}
}
