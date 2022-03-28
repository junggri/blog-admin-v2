import React, {FC, memo} from "react";
import classNames from "classnames";
import styles from "./Typography.module.scss";

interface Props {
  className?: string
  component: "h1" | "h2" | "h3" | "h4",
  type?: "normal" | "info" | "error"
}

const Typography: FC<Props> = memo(({component, type = "normal", children, className}) => {
  return React.createElement(component, {
    className: classNames(
      styles.typography,
      styles[type],
      className
    ),
    children
  });
});

export default Typography;