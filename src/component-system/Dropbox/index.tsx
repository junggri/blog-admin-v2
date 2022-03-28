import React, {FC, memo} from "react"
import styles from "./dropBox.module.scss"
import {Scrollbars} from 'react-custom-scrollbars';

interface Props {
  items: string[]
}

const DropBox: FC<Props> = memo(({items}) => {

  return (
    <div>123</div>
    // <Scrollbars style={{width: 200, height: 100}} autoHide className={styles.box}>

    // </Scrollbars>
  )
})

export default DropBox