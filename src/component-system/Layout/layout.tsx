import React, {FC, memo} from 'react';
import classNames from "classnames";
import styles from "./layout.module.scss";

interface Layout {
  className?: string
}

const Layout: FC<Layout> = memo(({className, children}) => {
  return (
    <section className={classNames(styles.layout, className)}>{children}</section>
  );
});

export default Layout;