import type { ComponentProps } from "react";
import { cn } from "../utils";

type Props = { label?: string } & ComponentProps<"input">;
export function Input({ className, label, ...props }: Props) {
  return (
    <label className="flex flex-col text-sm font-medium text-blue-900">
      {label}
      <input
        className={cn(
          "rounded-sm border border-gray-500 p-2 ring-offset-0 outline-purple-600 user-invalid:border-red-500",
          className,
        )}
        {...props}
      />
    </label>
  );
}
