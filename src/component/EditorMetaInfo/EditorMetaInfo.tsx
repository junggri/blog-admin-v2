import React, {Dispatch, FC, memo, SetStateAction, useCallback, useRef} from 'react'
import styles from "./EditorMetaInfo.module.scss"
import {FormikErrors} from "formik/dist/types";
import Thumbnail from "./Thumbnail/Thumbnail";
import TextInput from "../TextInput/TextInput";
import {WriteFormik} from "../../pages/write";
import HashTags from "./HashTags/HashTags";
import classNames from "classnames";
import Button from "../../component-system/Button/button";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../reducer";

interface Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<any>> | Promise<void>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: WriteFormik
  isNext: boolean
  setIsNext: Dispatch<SetStateAction<boolean>>
}

const EditorMetaInfo: FC<Props> = memo(({setFieldValue, handleChange, values, isNext, setIsNext}) => {
  const state = useSelector((state: RootState) => state.post);
  const history = useHistory();

  const onClickSaveButton = () => {
    if (!state.error) {
      history.goBack()
    }
  }

  const onClickDraftButton = () => {
    setFieldValue("open", false)
    setFieldValue("is_published", false);
    if (!state.error) {
      history.goBack()
    }
  }

  return (
    <div className={classNames(styles.EditorMetaInfo, {[styles.slide]: isNext})}>
      <Thumbnail setFieldValue={setFieldValue} values={values}/>
      <TextInput name={"title"} placeholder={"제목을 입력하세요"} handleChange={handleChange} value={values.title} title={"제목"}/>
      <TextInput name={"desc"} placeholder={"세부정보를 입력하세요"} handleChange={handleChange} value={values.desc} title={"세부정보"}/>
      <HashTags setFieldValue={setFieldValue} values={values}/>
      <div className={styles.radioButtons}>
        <label htmlFor="open">
          <span>공개</span>
          <input type="radio" id={"open"} name={"open"} checked={values.open} onChange={() => setFieldValue("open", true)}/>
        </label>
        <label htmlFor="close">
          <span>비공개</span>
          <input type="radio" id={"close"} name={'open'} checked={!values.open} onChange={() => setFieldValue("open", false)}/>
        </label>
      </div>
      <div className={styles.buttonBox}>
        <Button onClick={onClickDraftButton} type={"submit"}>임시저장</Button>
        <Button onClick={onClickSaveButton} type={"submit"}>저장하기</Button>
      </div>
    </div>
  )
})

export default EditorMetaInfo
