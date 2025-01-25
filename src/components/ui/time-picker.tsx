"use client";
import React, { forwardRef, useCallback, useState } from "react";
import { useTimescape, type Options } from "timescape/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const timePickerInputBase =
  "p-1 inline w-full tabular-nums h-fit border-none outline-none select-none content-box caret-transparent rounded-sm min-w-8 text-center focus:bg-blue-500/10 focus-visible:ring-0 focus-visible:outline-none";
const timePickerSeparatorBase = "text-xs text-gray-400";

type TimeFormat = "hours" | "minutes" | "am/pm";

type DateTimeArray<T extends TimeFormat> = T[];
type TimePickerFormatDefaults = [DateTimeArray<TimeFormat>];

const DEFAULTS: TimePickerFormatDefaults = [["hours", "minutes", "am/pm"]];

type TimescapeReturn = ReturnType<typeof useTimescape>;
type InputPlaceholders = Record<TimeFormat, string>;
const INPUT_PLACEHOLDERS: InputPlaceholders = {
  hours: "HH",
  minutes: "MM",
  "am/pm": "AM/PM",
};

const TimeGrid = forwardRef<
  HTMLDivElement,
  {
    format: TimePickerFormatDefaults;
    className?: string;
    timescape: Pick<TimescapeReturn, "getRootProps" | "getInputProps">;
    placeholders: InputPlaceholders;
    onAMPMClick: () => void;
    ampmValue: string;
    disabled?: boolean;
  }
>(
  (
    {
      format,
      className,
      timescape,
      placeholders,
      onAMPMClick,
      ampmValue,
      disabled,
    }: {
      format: TimePickerFormatDefaults;
      className?: string;
      timescape: Pick<TimescapeReturn, "getRootProps" | "getInputProps">;
      placeholders: InputPlaceholders;
      onAMPMClick: () => void;
      ampmValue: string;
      disabled?: boolean;
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex items-center w-40 p-1 border",
          className,
          "border-input rounded-md gap-1 selection:bg-transparent selection:text-foreground"
        )}
        {...timescape.getRootProps()}
        ref={ref}
      >
        {format[0].map((unit, index) => (
          <React.Fragment key={unit}>
            {unit === "am/pm" ? (
              <input
                className={cn(
                  "p-1 !bg-transparent outline-none cursor-pointer w-10 ms-auto text-sm font-semibold",
                  {
                    "bg-foreground/15": unit === "am/pm",
                  }
                )}
                readOnly
                disabled={disabled}
                value={ampmValue}
                onClick={onAMPMClick}
                placeholder={placeholders[unit]}
              />
            ) : (
              <Input
                className={cn(timePickerInputBase)}
                {...timescape.getInputProps(unit)}
                placeholder={placeholders[unit]}
                disabled={disabled}
              />
            )}
            {index < format[0].length - 2 && (
              <span className={timePickerSeparatorBase}>
                {unit === "am/pm" ? "" : ":"}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

TimeGrid.displayName = "TimeGrid";

interface TimePickerProps {
  value?: Date;
  format?: TimePickerFormatDefaults;
  placeholders?: InputPlaceholders;
  onChange?: Options["onChangeDate"];
  timeOptions?: Options;
  className?: string;
  disabled?: boolean;
}

const DEFAULT_TS_OPTIONS = {
  hour12: true,
};

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      format = DEFAULTS,
      placeholders,
      timeOptions = DEFAULT_TS_OPTIONS,
      onChange,
      className,
      disabled,
    },
    ref
  ) => {
    const [ampm, setAMPM] = useState(() =>
      value ? (value.getHours() >= 12 ? "PM" : "AM") : "AM"
    );

    const handleTimeChange = useCallback(
      (nextDate: Date | undefined) => {
        if (onChange) {
          onChange(nextDate);
        } else {
          console.log(nextDate);
        }
      },
      [onChange]
    );

    const timescape = useTimescape({
      ...timeOptions,
      ...(value && { date: value }),
      onChangeDate: handleTimeChange,
    });

    const toggleAMPM = useCallback(() => {
      setAMPM((prev) => (prev === "AM" ? "PM" : "AM"));
    }, []);

    return (
      <TimeGrid
        format={format}
        className={className}
        timescape={timescape}
        placeholders={placeholders ?? INPUT_PLACEHOLDERS}
        ref={ref}
        onAMPMClick={toggleAMPM}
        ampmValue={ampm}
        disabled={disabled}
      />
    );
  }
);

TimePicker.displayName = "TimePicker";
