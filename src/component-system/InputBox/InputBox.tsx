import React, {FC, memo} from "react";
import styles from "./inputBox.module.scss";
import classNames from "classnames";

interface Props {
  name: string
  value: string
  type: string
  placeholder: string
  className?: string
  handleChange: (e: React.ChangeEvent<any>) => void;
  size?: 'big' | 'middle' | 'small'
  maxLength?: number
}

const InputBox: FC<Props> = memo(({name, value, type = "text", placeholder, className, handleChange, maxLength}) => {
  return (
    <div className={classNames(styles.input, className)}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="false"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
    </div>
  );
});

export default InputBox;