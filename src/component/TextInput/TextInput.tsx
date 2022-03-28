import React, {FC, memo} from 'react'
import styles from "./TextInput.module.scss"
import {FormikErrors} from "formik/dist/types";

interface Props {
  name: string
  placeholder: string
  handleChange: (e: React.ChangeEvent<any>) => void;
  value: string
  title: string
}

const TextInput: FC<Props> = memo(({name, placeholder, value, title, handleChange}) => {
  return (
    <div className={styles.TextInput}>
      <div>
        <span>{title}</span>
      </div>
      <div>
        <input type="text" name={name} placeholder={placeholder} value={value} onChange={handleChange}/>
      </div>
    </div>
  )
})

export default TextInput
