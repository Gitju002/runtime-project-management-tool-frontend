import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * A button that opens a calendar popover when clicked. The button shows the
 * current date selected, and the user can select a new date by clicking on the
 * calendar. When the user selects a new date, the callback passed to the
 * `onChange` prop will be called with the new date.
 *
 * @param {{ placeholder: string, value: Date, onChange: (date: Date | undefined) => void, disabled?: (date: Date) => boolean, btnDisabled?: boolean }} props
 * @prop {string} placeholder - The text to show in the button when no date is
 *   selected.
 * @prop {Date} value - The currently selected date.
 * @prop {(date: Date | undefined) => void} onChange - The callback to call when
 *   the user selects a new date.
 * @prop {(date: Date) => boolean} [disabled] - An optional function that takes a
 *   date and returns a boolean indicating whether the date should be disabled.
 * @prop {boolean} [btnDisabled] - An optional boolean indicating whether the
 *   button should be disabled.
 */

export function DatePicker({
  placeholder,
  value,
  onChange,
  disabled,
  btnDisabled,
}: {
  placeholder: string;
  value: Date | null;
  onChange: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  btnDisabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={btnDisabled}
          type="button"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? value : new Date()}
          disabled={disabled}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
