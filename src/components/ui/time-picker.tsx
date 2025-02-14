interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}
export function TimePicker({ value, onChange, disabled }: TimePickerProps) {
  return (
    <input
      type="time"
      id="timeInput"
      className="border border-input dark:bg-slate-800 p-1 rounded cursor-pointer"
      value={value ? new Date(value).toTimeString().slice(0, 5) : ""}
      onChange={(e) => {
        const time = e.target.value;
        if (!time) return;

        const [hours, minutes] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        onChange(date.toISOString());
      }}
      disabled={disabled}
    />
  );
}
