import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "reducer";
import styles from "./post.module.scss";
import Spinner from "component-system/spinner/spinner";
import {useHistory, useLocation} from "react-router-dom";
import {PostActions} from "../../reducer/post";
import {PageEdge} from "../../core/schema";
import classNames from "classnames";

interface Props {
}

type filter = "open" | "close" | "draft";

const Post: FC<Props> = memo(() => {
  const dispatch = useDispatch()
  const state = useSelector((state: AppState) => state.post)
  const [filter, setFiler] = useState<filter>("open")
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (location.search === "?open=true") {
      setFiler("open")
    } else if (location.search === "?open=false") {
      setFiler("close")
    } else {
      setFiler("draft")
    }
  }, [location])

  const onClickEditButton = (hashId: string) => {
    history.push(`/write?hashId=${hashId}`)
  }

  const renderPost = () => {
    if (!state.data) {
      return []
    }
    const totalCount = state.data.edges.length

    const onClickDeleteButton = (page: PageEdge) => {
      dispatch(PostActions.DELETE_POST(page.node.hashId));
      dispatch(PostActions.UPDATE_POST(page))
    }


    return state.data.edges.map((e, i) => {
      return (
        <div key={e.node.desc} className={styles.item}>
          <span>
            {totalCount - i}
          </span>
          <span>
            {e.node.title}
          </span>
          <div className={styles.controlBox}>
            <span onClick={() => onClickEditButton(e.node.hashId)}>수정</span>
            <span onClick={() => onClickDeleteButton(e)}>삭제</span>
          </div>
        </div>
      )
    })
  }


  useEffect(() => {
    dispatch(PostActions.GET_POSTS(0, 20, filter))
  }, [filter])


  return (
    <div className={styles.post}>
      {state.loading && <Spinner/>}
      <h1>포스트관리</h1>
      <div className={styles.container}>
        <div className={classNames(styles.item, styles.header)}>
          <span>
            번호
          </span>
          <span>
            제목
          </span>
          <div className={styles.controlBox}>
            <div>설정</div>
          </div>
        </div>
        {renderPost()}
      </div>
    </div>
  );
});

export default Post;
