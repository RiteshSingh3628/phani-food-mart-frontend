import { cn } from "@/lib/utils";

export default function InlineError({ className = "", error, errors, name }) {
  const message = error ?? (errors && name ? errors[name]?.message : null);
  return message ? (
    <span className={cn("text-xs text-pretty text-red-500", className)}>
      {message}
    </span>
  ) : null;
}