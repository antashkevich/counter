import React, { FC, useState } from "react";

type Props = {
  name: string;
  value: number;
  onChange: (num: number) => void;
  disabledIncrement?: boolean;
  disabledDecrement: boolean;
};

export const CardSettingsField: FC<Props> = ({name, value, onChange, disabledIncrement, disabledDecrement}) => {
  const [valueCount, setValueCount] = useState<number>(value);

  const onCommonIncrement = () => {
    setValueCount(prev => prev + 1)
    onChange(valueCount + 1)
  };

  const onCommonDecrement = () => {
    if (valueCount <= 1) {
      setValueCount(prev => prev - 1)
      onChange(valueCount - 1)
      return
    }
    setValueCount(prev => prev - 1)
    onChange(valueCount - 1)
  };

  return (
    <div>
      <div>
        <label>
          <span>{name}</span>
          <div>
            <button onClick={onCommonDecrement} disabled={disabledDecrement}>-</button>
            <input 
              type="number"
              readOnly
              value={valueCount} />
            <button onClick={onCommonIncrement} disabled={disabledIncrement}>+</button>
          </div>
        </label>
      </div>
    </div>
  );
}
