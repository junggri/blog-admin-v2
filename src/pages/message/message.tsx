import React, {FC, memo, useEffect, useMemo, useState} from "react";
import useGetMessageActions from "hooks/useGetMessageActions";
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "reducer";
import styles from "./message.module.scss";
import * as source from "../../core/schema";
import {RiMessage3Line} from "react-icons/ri"
import MessageItem from "../../component/MessagItem/MessageItem";
import classNames from "classnames";
import {useFormik} from "formik";
import {useMutation} from "@apollo/client";
import {REPLY_MESSAGE} from "../../graphql/mutation";
import useValidation from "../../hooks/useValidation";
import UseValidation from "../../hooks/useValidation";
import client from "../../core/client";
import {messageActions} from "../../reducer/message";

interface Props {
}

export interface Formik {
  method: string
  content: string
  subject: string
}

const Message: FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const message = useSelector((state: AppState) => state.message);

  const [target, setTarget] = useState<source.Message | null>(null);
  const [reply, setReply] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(0);
  const [replyMessage, meta] = useMutation(REPLY_MESSAGE);


  const {values, handleSubmit, handleChange, setFieldValue} = useFormik<Formik>({
    initialValues: {
      method: "email",
      content: "",
      subject: ""
    },
    onSubmit: async () => {
      if (UseValidation(values)) {
        return
      }

      const email = process.env.NODE_ENV === "development" ? "jjuu6933@naver.com" : target?.email
      await replyMessage({
        variables: {
          data: {
            email: email,
            content: values.content,
            subject: values.subject
          }
        }
      })
    }
  })

  const renderMessage = useMemo(() => {

    if (!message.data) {
      return []
    }

    return message.data.map((e, i) => {
      return (
        <MessageItem
          target={e}
          index={i}
          setTarget={setTarget}
          setReply={setReply}
        />
      )
    })
  }, [message.data])

  useEffect(() => {
    dispatch(messageActions.GET_MESSAGE())
  }, []);

  useEffect(() => {
    setHeight(document.body.clientHeight);
  }, [])

  if (!message.data?.length) {
    return (
      <div className={styles.message}>도착한 메시지가 없습니다.</div>
    );
  }


  return (
    <>
      <div className={styles.message}>
        <div className={styles.messageBox}>
          {renderMessage}
        </div>
        <section>
          {!target &&
          <div className={styles.icons}>
           <span>
           <RiMessage3Line/>
           </span>
          </div>
          }
          {target &&
          <div className={styles.meta}>
             <div className={styles.who}>
                <span>보낸 이</span>
                <span>{target.name}</span>
             </div>
             <div className={styles.created}>
                <span>날짜</span>
                <span>{target.createdAt.split("T")[0]}</span>
             </div>
             <div className={styles.content}>
                <span>내용</span>
               {target.content}
             </div>
          </div>
          }
        </section>
      </div>
      <div
        className={classNames(styles.replyBox)}
        style={{height: reply ? height : 0}}
      >
        <div className={styles.contentBox}
             style={{
               height: reply ? height * 0.5 : 0,
               padding: reply ? 40 : 0
             }}>
          <section className={styles.left}>
            <div>
              {/*{target?.name}*/}
              이정수
            </div>
            <div>
              {target?.content}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda corporis deleniti dignissimos enim est explicabo, facilis inventore officia quod, ratione reprehenderit similique
              tempore temporibus voluptatibus! Eos mollitia non quam!
            </div>
            <div></div>
          </section>
          <section className={styles.right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.subject}>
                <input type="text" value={values.subject} onChange={handleChange} name="subject" placeholder="답장의 제목을 적자"/>
              </div>
              <textarea name="content" id="" placeholder="답장을 입력하세요." value={values.content} onChange={handleChange}/>
              <div className={styles.submitBox}>
                <label htmlFor="email">
                  <span>이메일</span>
                  <input type="radio" name="method" id="email" onChange={handleChange} value={"email"} checked={values.method === "email"}/>
                </label>
                <label htmlFor="phone">
                  <span>휴대폰</span>
                  <input type="radio" name="method" id="phone" onChange={handleChange} value={"phone"} checked={values.method === "phone"}/>
                </label>
                <button type={"submit"}>전송하기</button>
                {/*<div className={styles.button} onClick={() => setReply(false)}>취소하기</div>*/}
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
});

export default Message;
