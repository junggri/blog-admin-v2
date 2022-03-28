import React, {FC, memo} from "react";

interface Props {
  data: string
  className: string
  onClickTarget: (target: string) => void
}

const SelectItem: FC<Props> = memo(({data, className, onClickTarget}) => {

  const onClick = () => {
    onClickTarget(data);
  };

  return (
    <div className={className} onClick={onClick}>
      {data}
    </div>
  );
});

export default SelectItem;