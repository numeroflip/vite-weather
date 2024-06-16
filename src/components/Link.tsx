import clsx from "clsx";
import { HTMLProps } from "react";

export default function Link({
  className,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      className={clsx(
        "text-purple-600 hover:underline active:text-purple-700 active:text-underline",
        className
      )}
      {...props}
    ></a>
  );
}
