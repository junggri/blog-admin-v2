import React, {FC, memo, useCallback, useMemo} from 'react'
import styles from "./postItem.module.scss"
import {PageEdge} from "core/schema";
import {Link} from 'react-router-dom';
import {BiPencil} from "react-icons/bi"
import {VscTrash} from "react-icons/vsc"
import useGetPostActions from "hooks/useGetPostActions";


interface Props {
  data: PageEdge
  indexReverse: number
  filter: string
  targetIndex: number
}

const PostItem: FC<Props> = memo(({data, indexReverse, filter, targetIndex}) => {
  const postActions = useGetPostActions()

  const onClickDelete = useCallback(() => {
    postActions.deleteContent({hashId: data.node.hashId, filter: filter, index: targetIndex})
  }, [data]);

  return (
    <tr className={styles.postItem}>
      <td className={styles.check}>
        <label htmlFor="selected"/>
        <input type="checkbox" id="selected"/>
      </td>
      <td className={styles.number}>{indexReverse}</td>
      <Link to={`/content/${data.node?.hashId}`}>
        <td className={styles.content}>{data.node.title}</td>
      </Link>
      <td className={styles.createdAt}>{data.node.createdAt.split("T")[0]}</td>
      <td className={styles.viewed}>{!data.node.hit?.length ? "-" : data.node.hit?.length}</td>
      <td className={styles.reply}>{!data.node.reply?.length ? "-" : data.node.reply?.length}</td>
      <td className={styles.setting}>
        <span>
        <Link to={`/write/${data.node.hashId}`}>
          <BiPencil/>
        </Link>
        </span>
        <span onClick={onClickDelete}>
          <VscTrash/>
        </span>
      </td>
    </tr>
  )
})

export default PostItem