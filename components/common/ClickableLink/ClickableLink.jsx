import Link from "next/link";
import { cn } from "@/lib/utils";

function ClickableLink({
  className,
  route = "/",
  routeType,
  variant = "none",
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      target={routeType === "external" ? "_blank" : ""}
      href={route}
      className={cn(
        "text-xs text-[#EAAA2A] hover:underline transition-all",
        className,
        {
          "text-sm font-medium": variant === "tag",
          "font-normal text-gray-600": variant === "normal",
        }
      )}
    >
      {children}
    </Link>
  );
}

export default ClickableLink;

