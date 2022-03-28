import React, {Dispatch, FC, memo, SetStateAction, useCallback, useRef, useState} from 'react'
import styles from "../../pages/message/message.module.scss";
import {Message} from "../../core/schema";
import classNames from "classnames";


interface Props {
  target: Message
  index: number
  setTarget: Dispatch<SetStateAction<Message | null>>
  setReply: Dispatch<SetStateAction<boolean>>
}

const MessageItem: FC<Props> = memo(({target, index, setTarget, setReply}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [clicked, setClicked] = useState<boolean>(false);


  const onClickButton = useCallback(() => {
    if (!buttonRef.current) {
      return;
    }
    setTarget(target);
    setClicked(true);
    buttonRef.current.textContent = "답장하기"
  }, [clicked, buttonRef])

  const onBlurButton = useCallback(() => {
    if (!buttonRef.current) {
      return;
    }
    setClicked(false)
    buttonRef.current.textContent = "확인하기"
  }, [clicked, buttonRef])

  const onClickReplyButton = useCallback(() => {
    setReply(true)
  }, [])

  return (
    <div className={styles.item} key={target.hashId}>
      <div className={styles.number}>{index}</div>
      <div className={styles.content}>{`${target.name}님께서 메시지를 보냈습니다.`}</div>
      {!clicked
        ?
        <button
          className={classNames(styles.button, {[styles.clicked]: clicked})}
          ref={buttonRef}
          onFocus={onClickButton}
        >
          확인하기
        </button>
        :
        <button
          className={classNames(styles.button, {[styles.clicked]: clicked})}
          ref={buttonRef}
          onBlur={onBlurButton}
          onClick={onClickReplyButton}
        >
          확인하기
        </button>
      }
    </div>
  )
})

export default MessageItem;