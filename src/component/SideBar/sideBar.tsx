import React, {FC, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styles from "./sideBar.module.scss"
import {BiChevronRight} from "react-icons/bi";
import {VscCircleFilled} from "react-icons/vsc"
import {Link} from "react-router-dom";

interface Props {

}

const SideBar: FC<Props> = memo(() => {
  const [click, setClick] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);

  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(() => {
    setClick(!click)
  }, [click])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const style = window.getComputedStyle(ref.current)
    setHeight(parseInt(style.height, 10) * 4);
  }, [ref.current])

  return (
    <div className={styles.sideBar}>
      <span className={styles.menu}>MENU</span>
      <ul>
        <li onClick={handleClick}>
          <span>게시물</span>
          <span>
            <BiChevronRight/>
          </span>
        </li>
        <div className={styles.typeOfPost} style={{
          height: click ? height : 0
        }}>
          <Link to={"/post?open=true"}>
            <div ref={ref}>
              <span><VscCircleFilled/></span>
              <span>공개</span>
            </div>
          </Link>
          <Link to={"/post?open=false"}>
            <div>
              <span><VscCircleFilled/></span>
              <span>비공개</span>
            </div>
          </Link>
          <Link to={"/post?published=false"}>
            <div>
              <span><VscCircleFilled/></span>
              <span>임시저장</span>
            </div>
          </Link>
          <Link to={"/write"}>
            <div>
              <span><VscCircleFilled/></span>
              <span>새글쓰기</span>
            </div>
          </Link>
        </div>
        <Link to="/message">
          <li>
            <span>메시지</span>
            <span>
            <BiChevronRight/>
          </span>
          </li>
        </Link>
        <Link to="/dashboard">
          <li>
            <span>대시보드</span>
            <span>
            <BiChevronRight/>
          </span>
          </li>
        </Link>
      </ul>
    </div>
  )
})

export default SideBar