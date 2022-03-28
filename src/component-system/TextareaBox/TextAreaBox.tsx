import React, {FC, memo} from "react";
import styles from "./textAreaBox.module.scss";
import classNames from "classnames";

interface Props {
  name: string
  placeholder: string
  values: string
  cols?: number
  rows?: number
  readonly?: boolean
  className?: string
  onChange: (e: React.ChangeEvent<any>) => void
}

const TextAreaBox: FC<Props> = memo(({
                                       rows = 5,
                                       placeholder,
                                       values,
                                       readonly = false,
                                       name,
                                       onChange,
                                       className
                                     }) => {
  return (
    <div className={styles.textarea}>
      <textarea
        rows={rows}
        placeholder={placeholder}
        name={name}
        readOnly={readonly}
        onChange={onChange}
        className={classNames(className)}
        value={values}
      />
    </div>
  );
});

export default TextAreaBox;