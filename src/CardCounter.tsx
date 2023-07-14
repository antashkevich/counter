import React, { FC, useEffect, useState } from "react";

type Props = {
  maxValue: number;
  startValue: number;
  openSettingsCard: () => void;
};

export const CardCounter: FC<Props> = ({
  maxValue,
  openSettingsCard,
  startValue,
}) => {
  const [value, setValue] = useState<number>(0);
  const [incrementDisable, setIncrementDisable] = useState<boolean>(false);
  const [resetDisable, setResetDisable] = useState<boolean>(true);

  useEffect(() => {
    const valuesObject = localStorage.getItem("CounterValues") || ""

    if(valuesObject) {
      const value = JSON.parse(valuesObject).startCounter
      setValue(value)
    }
  }, [])

  const onIncrement = () => {
    setValue(prev => prev + 1);
    setResetDisable(false);
    if (value === maxValue - 1) {
      setIncrementDisable(true);
    }
  };

  const onReset = () => {
    setValue(startValue);
    setResetDisable(true);
    setIncrementDisable(false);
  };

  const onSettings = () => {
    openSettingsCard();
  };

  return (
    <div>
      <div>
        <div>
          Total: <span>{incrementDisable ? <b>{value}</b> : value}</span>
        </div>
      </div>
      <div>
        <button onClick={onIncrement} disabled={incrementDisable}>
          Inc
        </button>
        <button onClick={onReset} disabled={resetDisable}>
          Reset
        </button>
        <button onClick={onSettings}>Set</button>
      </div>
    </div>
  );
};
