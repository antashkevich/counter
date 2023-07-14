import React, { FC, useEffect, useState } from "react";
import { CardSettingsField } from "./CardSettingsField";

type Props = {
  maxValue: number;
  startValue: number;
  saveSettings: (maxNum: number, startValue: number) => void;
};

export const CardSettings: FC<Props> = ({
  maxValue,
  startValue,
  saveSettings,
}) => {
  const [maxNum, setMaxNum] = useState<number>(maxValue);
  const [startNum, setStartNum] = useState<number>(startValue);
  const [disabledMaxValueDecrement, setDisabledMaxValueDecrementt] = useState<boolean>(false);
  const [disabledStartValueIncrement, setDisabledStartValueIncrement] = useState<boolean>(false);
  const [disabledStartValueDecrement, setDisabledStartValueDecrement] = useState<boolean>(false);

  useEffect(() => {
    setDisabledStartValueIncrement(false)
    setDisabledMaxValueDecrementt(false)
    setDisabledStartValueDecrement(false)

    if (startNum === 0) {
      setDisabledStartValueDecrement(true)
      setDisabledStartValueIncrement(false)
    }
    if (maxNum <= startNum + 1) {
      setDisabledStartValueIncrement(true)
      setDisabledMaxValueDecrementt(true)
    }
  }, [startNum, maxNum])

  const closeSettings = () => {
    saveSettings(maxNum, startNum);
  };

  const onChangeMaxValue = (num: number) => {
    setMaxNum(num);
  };

  const onChangeStartValue = (num: number) => {
    setStartNum(num);
  };

  return (
    <div>
      <div>
        <CardSettingsField
          name={"Max value"}
          value={maxNum}
          onChange={onChangeMaxValue}
          disabledDecrement={disabledMaxValueDecrement}
        />
        <CardSettingsField
          name={"Start value"}
          value={startNum}
          onChange={onChangeStartValue}
          disabledIncrement={disabledStartValueIncrement}
          disabledDecrement={disabledStartValueDecrement}
        />
      </div>

      <div>
        <button onClick={closeSettings}>Set</button>
      </div>
    </div>
  );
};
