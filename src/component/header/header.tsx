import React, {FC, memo, useEffect} from 'react';
import styles from "./header.module.scss";

import {Link} from "react-router-dom";

interface Props {

}

const Header: FC<Props> = memo(() => {


  return (
    <div className={styles.header}>
      <section>
        <div>
          <Link to="/post">게시글</Link>
        </div>
        <div>
          <Link to="/message">메시지</Link>
        </div>
        <div>
          <Link to="/dashboard">방문자 대시보드</Link>
        </div>
      </section>
      <section>
        <Link to={"/write"}>
          <div className={styles.writeBtn}>
            새글쓰기
          </div>
        </Link>
      </section>
    </div>
  );
});

export default Header;