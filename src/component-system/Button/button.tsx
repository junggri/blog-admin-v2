import React, {FC, memo} from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
import Typography from "../Typography/Typography";
import Ink from "react-ink";

interface Props {
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset" | undefined
}

const Button: FC<Props> = memo(({className, children, onClick, type = "submit"}) => {
  return (
    <button
      className={classNames(styles.button, className)}
      type={type}
      onClick={onClick}
    >
      <Typography component="h2" className={styles.font}>
        {children}
      </Typography>
      <Ink/>
    </button>
  );
});

export default Button;