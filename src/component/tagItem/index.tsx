import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import styles from "./index.module.scss";
import {Tag} from "core/schema";
import {isBoolean} from "util";
import classNames from 'classnames';

interface Props {
  tag: Tag
  onClickTag: (id: number) => void
  selectTag: number[]
}

const TagItem: FC<Props> = memo(({tag, onClickTag, selectTag}) => {
  const [isClick, setIsClick] = useState<boolean>(false);


  const onClick = useCallback(() => {
    onClickTag(tag.id);
    setIsClick(!isClick);
  }, [tag, isClick]);

  useEffect(() => {
    if (selectTag.includes(tag.id)) {
      setIsClick(true)
    }
  }, [selectTag])

  return (
    <div
      className={classNames(styles.tagItem, {[styles.click]: isClick})}
      onClick={onClick}>
      {tag.tag}
    </div>
  );
});

export default TagItem;