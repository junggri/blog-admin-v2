import React, {FC, memo, useCallback, useEffect, useMemo, useState} from 'react'
import styles from "./HashTags.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "../../../reducer";
import {Tag} from "../../../core/schema";
import {TagActions} from "../../../reducer/tag";
import {FormikErrors} from "formik/dist/types";
import {WriteFormik} from "../../../pages/write";

interface Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<any>> | Promise<void>;
  values: WriteFormik
}

const HashTags: FC<Props> = memo(({setFieldValue, values}) => {
  const dispatch = useDispatch()
  const state = useSelector((state: AppState) => state.tag);
  const [value, setValue] = useState<string>("")
  const [flatTags, setFlatTags] = useState<string[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [tagIds, setTagIds] = useState<number[]>([]);

  const onClickHashTags = (id: number) => {
    const copy = [...tagIds];
    if (copy.includes(id)) {
      const index = copy.indexOf(id);
      copy.splice(index, 1);
    } else {
      copy.push(id)
    }
    setTagIds([...copy])
    setFieldValue('tagIds', copy)
  }

  const renderTags = useMemo(() => {
    if (!state.data) {
      return null
    }

    return state.data.map((e: Tag) => {
      return (
        <li
          key={e.tag}
          onClick={() => onClickHashTags(e.id)}
          style={{
            background: values.tagIds.includes(e.id) ? "#0F3AD1" : "white",
            color: values.tagIds.includes(e.id) ? "white" : "black",
          }}
        >
          {e.tag}
        </li>
      )
    });
  }, [state.data, values])

  const onChangeValue = useCallback((e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
  }, [value])


  const onKeyUp = async (e: React.KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value
    setTagName(value)
  }

  const onClickMakeButton = () => {
    if (flatTags.includes(tagName) || !tagName) {
      return
    }
    dispatch(TagActions.CREATE_TAG(tagName))
  }

  useEffect(() => {
    dispatch(TagActions.GET_TAGS())
  }, [])

  useEffect(() => {
    if (!state.data) {
      return
    }

    const tagsNameMap = state.data.map((e: Tag) => {
      return e.tag
    })
    setFlatTags(tagsNameMap)
  }, [state.data])

  return (
    <div className={styles.HashTags}>
      <div>
        <span>태그 선택하기</span>
      </div>
      <ul className={styles.hashBox}>
        {renderTags}
      </ul>
      <div className={styles.footer}>
        <div className={styles.makeBox}>
          <input type="text" placeholder={"태그만들기"} value={value} onChange={onChangeValue} onKeyPress={onKeyUp}/>
        </div>
        <div className={styles.button} onClick={onClickMakeButton}>
          <span>생성</span>
        </div>
      </div>
    </div>
  )
})
export default HashTags
