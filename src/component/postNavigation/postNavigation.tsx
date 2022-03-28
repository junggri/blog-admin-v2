import React, {FC, memo} from "react"
import styles from "./styles.module.scss"
import classNames from "classnames";

interface Props {
  number: number
  content: string
  createdAt: string
  viewed: number | string
  reply: number | string
  className: string
}

const PostNavigation: FC<Partial<Props>> = memo(
  ({number = "번호", content = "제목", createdAt = "작성일", viewed = "조회 수", reply = "댓글 수", className}) => {
    return (
      <div className={styles.navigation}>
        <div className={styles.check}>
          <label htmlFor="selected"/>
          <input type="checkbox" id="selected"/>
        </div>
        <div className={styles.number}>{number}</div>
        <div className={classNames(styles.content, className)}>{content}</div>
        <div className={styles.createdAt}>{createdAt}</div>
        <div className={styles.viewed}>{viewed}</div>
        <div className={styles.reply}>{reply}</div>
        <div className={styles.setting}>세팅</div>
      </div>
    )
  })

export default PostNavigation;