import { useState } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./button";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

export function TimePicker({ value, onChange, disabled }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial time
  const initialTime = value ? new Date(`2000/01/01 ${value}`) : new Date();
  const [hours, setHours] = useState(initialTime.getHours());
  const [minutes, setMinutes] = useState(initialTime.getMinutes());
  const [period, setPeriod] = useState(hours >= 12 ? "PM" : "AM");

  // Convert 24h to 12h format
  const displayHours = hours % 12 || 12;

  const handleHourChange = (delta: number) => {
    let newHours = hours + delta;
    if (newHours > 23) newHours = 0;
    if (newHours < 0) newHours = 23;
    setHours(newHours);
    setPeriod(newHours >= 12 ? "PM" : "AM");
    updateTime(newHours, minutes);
  };

  const handleMinuteChange = (delta: number) => {
    let newMinutes = minutes + delta;
    if (newMinutes > 59) newMinutes = 0;
    if (newMinutes < 0) newMinutes = 59;
    setMinutes(newMinutes);
    updateTime(hours, newMinutes);
  };

  const togglePeriod = () => {
    const newHours = hours >= 12 ? hours - 12 : hours + 12;
    setHours(newHours);
    setPeriod(period === "AM" ? "PM" : "AM");
    updateTime(newHours, minutes);
  };

  const updateTime = (h: number, m: number) => {
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const timeString = date.toISOString();

    onChange(timeString);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-200 dark:bg-background border border-input rounded-lg shadow-sm  focus:outline-none "
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500 dark:text-lime-shade" />
          <span className="text-gray-700 dark:text-lime-shade">
            {`${displayHours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")} ${period}`}
          </span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute mt-1 top-10 right-0 max-w-[250px] bg-white dark:bg-background  rounded-lg transition-all duration-200 shadow-lg shadow-slate-600/30 dark:shadow-none z-10 border border-input">
          <div className="p-4 flex items-center justify-between gap-4">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => handleHourChange(1)}
                className="p-1 my-1 dark:shadow-md dark:shadow-teal-shade/40 dark:hover:bg-white  "
              >
                <ChevronUp className="w-5 h-5 dark:text-teal-shade text-gray-600" />
              </Button>
              <span className="text-2xl font-semibold w-12 text-center">
                {displayHours.toString().padStart(2, "0")}
              </span>
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => handleHourChange(-1)}
                className="p-1 hover:bg-white  my-1 dark:shadow-md dark:shadow-teal-shade/40"
              >
                <ChevronDown className="w-5 h-5 dark:text-teal-shade text-gray-600" />
              </Button>
            </div>

            <span className="text-2xl font-semibold text-gray-500">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => handleMinuteChange(1)}
                className="p-1 hover:bg-white  my-1 dark:shadow-md dark:shadow-teal-shade/40"
              >
                <ChevronUp className="w-5 h-5 dark:text-teal-shade text-gray-600" />
              </Button>
              <span className="text-2xl font-semibold w-12 text-center">
                {minutes.toString().padStart(2, "0")}
              </span>
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => handleMinuteChange(-1)}
                className="p-1 hover:bg-white  my-1 dark:shadow-md dark:shadow-teal-shade/40"
              >
                <ChevronDown className="w-5 h-5 dark:text-teal-shade text-gray-600" />
              </Button>
            </div>

            {/* AM/PM */}
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              onClick={togglePeriod}
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-white dark:hover:bg-white dark:bg-background dark:text-teal-shade my-1 dark:shadow-md dark:shadow-teal-shade/40 "
            >
              {period}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
