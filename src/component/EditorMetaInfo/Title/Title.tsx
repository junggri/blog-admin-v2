import React, {FC, memo} from 'react'
import {FormikErrors} from "formik/dist/types";
import TextInput from "../../TextInput/TextInput";

interface Props {
  name: string
  placeholder: string
  handleChange: (e: React.ChangeEvent<any>) => void;
  value: string
  title: string
}

const Title: FC<Props> = memo(({name, placeholder, handleChange, value, title}) => {
  return (
    <TextInput name={name} placeholder={placeholder} handleChange={handleChange} value={value} title={title}/>
  )
})

export default Title
