import React, {FC} from "react"
import {BiLoaderAlt} from "react-icons/bi"
import styles from "./spinner.module.scss"

interface Props {
}

const Spinner: FC<Props> = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.icon}><BiLoaderAlt/></span>
    </div>
  )
}

export default Spinner