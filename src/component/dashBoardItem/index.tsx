import React, {FC} from "react";
import styles from "./dashBoardItem.module.scss";
import {Visit} from "core/schema";

interface Props {
  data: Visit
}

const DashBoardItem: FC<Props> = ({data}) => {
  return (
    <div className={styles.item}>
      <div>{data.regionName}</div>
      <div>{data.regionAddress}</div>
      <div>{data.count}</div>
      <div>{data.createdAt.split("T")[0]}</div>
    </div>
  );
};

export default DashBoardItem;