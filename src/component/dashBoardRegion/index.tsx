import React, {memo, FC, useMemo, useState, useRef, useEffect} from "react"
import styles from "./DashBoardRegion.module.scss"
import {Visit} from "core/schema";
import DashBoardItem from "../dashBoardItem";
import classNames from "classnames";

interface Props {
  region: string
  data: Visit[]
  handleTargetChild: (data: Visit[]) => void
}


const DashBoardRegion: FC<Props> = memo(({region, data, handleTargetChild}) => {
  const [click, setClick] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null)

  const handleSetData = () => {
    handleTargetChild(data)
  }
  // const renderData = useMemo(() => {
  //   if (!data) {
  //     return []
  //   }
  //
  //   return data.map((e) => {
  //     return <DashBoardItem data={e}/>
  //   })
  // }, [data])

  useEffect(() => {
    if (!ref.current) {
      return
    }
    setHeight(ref.current.clientHeight + 15)
  }, [ref.current])

  return (
    <div className={styles.dashBoardRegion} onClick={handleSetData}>
      {region}
    </div>
  )
})

export default DashBoardRegion