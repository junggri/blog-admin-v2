import React, {FC, memo} from "react";
import styles from "./ModalItem.module.scss";


interface Props {
  item: string
  border: boolean
}

const ModalItem: FC<Props> = memo(({item, border}) => {

  return (
    <div className={styles.modalItem} style={{
      borderBottom: !border ? 'none' : "1px solid rgba(0,0,0,0.1)",
    }}>
      {item}
    </div>
  );
});
export default ModalItem;