import React, {FC, memo, useCallback, useEffect, useRef} from 'react'
import styles from "./Thumbnail.module.scss"
import {FcPlus} from "react-icons/fc";
import {FormikErrors} from "formik/dist/types";
import {WriteFormik} from "../../../pages/write";

interface Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<any>> | Promise<void>;
  values: WriteFormik
}

const Thumbnail: FC<Props> = memo(({setFieldValue, values}) => {
  const fileBtn = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onClickFileBtn = useCallback(() => {
    if (!fileBtn.current) {
      return;
    }

    (fileBtn.current as HTMLInputElement).click()
  }, [fileBtn]);

  const onChangeFile = (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => {
    if (!e.target.files || !imageRef.current) {
      return;
    }
    const file: File = e.target.files[0];
    (imageRef.current as HTMLImageElement).src = URL.createObjectURL(file);
    setFieldValue("file", file);
  };


  useEffect(() => {
    if (values.thumbnail && imageRef.current) {
      const imageSrc = process.env.REACT_APP_S3_IMAGE_URL + values.thumbnail;
      imageRef.current.src = imageSrc
    }
  }, [values])

  return (
    <div className={styles.thumbnail} onClick={onClickFileBtn}>
      <img ref={imageRef}/>
      <FcPlus className={styles.icon}/>
      <input type="file" ref={fileBtn} onChange={onChangeFile} accept={"image/png, image/jpeg, image/jpg"}/>
    </div>
  )
})

export default Thumbnail
