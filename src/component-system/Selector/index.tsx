import React, {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from "./selector.module.scss";
import Scrollbars from "react-custom-scrollbars";
import SelectItem from "../SelectItem";
import {Visit} from "core/schema";

interface Props {
  data: string[]
  handleChangeTarget: (target: string) => void
  target: string | null
}

const Selector: FC<Props> = memo(({data, handleChangeTarget, target}) => {
  const [spread, setSpread] = useState<boolean>(false);

  const onClickTarget = (target: string) => {
    handleChangeTarget(target);
    setSpread(false);
  };

  const renderList = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((e) => {
      return (
        <SelectItem
          key={e}
          data={e}
          className={styles.listItem}
          onClickTarget={onClickTarget}
        />
      );
    });
  }, [data]);

  return (
    <>
      <div className={styles.selector} onClick={() => setSpread(!spread)}>
        <span>{target ? target : "선택하세요"}</span>
      </div>
      <Scrollbars
        className={styles.listContainer}
        style={{
          width: 230,
          height: spread ? 300 : 0,
          border: spread ? "1px solid rgba(0, 0, 0, 0.3)" : "1px solid rgba(0, 0, 0, 0)",
          position: "absolute"
        }}
      >
        {renderList}
      </Scrollbars>
    </>
  );
});

export default Selector;