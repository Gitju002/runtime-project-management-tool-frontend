import React, { useState } from "react";
import { Input } from "./input";

const TimePicker = () => {
  const [time, setTime] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        <Input
          type="time"
          id="timePicker"
          value={time}
          className="block"
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default TimePicker;
