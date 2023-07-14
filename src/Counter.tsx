import React, { useEffect, useState } from "react";
import { CardCounter } from "./CardCounter";
import { CardSettings } from "./CardSettings";


const maxDefaultValue = 5;

export const Counter = () => {
  const [maxNum, setMaxNum] = useState<number>(maxDefaultValue);
  const [startValue, setStartValue] = useState<number>(0);
  const [isSettings, setIsSettings] = useState<boolean>(false);

  useEffect(() => {
    const valuesObject = localStorage.getItem("CounterValues") || ""
    if(valuesObject) {
      const values = JSON.parse(valuesObject)
      setMaxNum(values["maxCounter"])
      setStartValue(values["startCounter"])
    }
  }, [])

  const openSettingsCard = () => {
    setIsSettings(true);
  };

  const saveSettings = (maxNum: number, startValue: number) => {
    setMaxNum(maxNum);
    setStartValue(startValue);
    setIsSettings(false);
    const values = JSON.stringify({
      "maxCounter": maxNum,
      "startCounter": startValue,
    })
    localStorage.setItem("CounterValues", values)
  };


  return (
    <div>
      {isSettings ? (
        <CardSettings
          maxValue={maxNum}
          startValue={startValue}
          saveSettings={saveSettings}
        />
      ) : (
        <CardCounter
          maxValue={maxNum}
          startValue={startValue}
          openSettingsCard={openSettingsCard}
        />
      )}
    </div>
  );
};
