import React, {FC, useMemo} from "react"
import styles from "./dashBoardSide.module.scss"
import {Visit} from "../../core/schema";

interface Props {
  data: Visit[] | null
}

const DashBoardSide: FC<Props> = ({data}) => {

  const renderData = useMemo(() => {
    if (!data) {
      return []
    }

    return data.map((e, i) => {
      return (
        <li>
          <span>{i + 1}</span>
          <span>{e.regionAddress}</span>
          <span>{e.createdAt.split("T")[0]}</span>
        </li>
      )
    })
  }, [data])

  if (!data) {
    return null
  }
  return (
    <div className={styles.dashBoardSide}>
      <h1>{data[0].regionName}</h1>
      <ul>
        {renderData}
      </ul>
    </div>
  )
}

export default DashBoardSide