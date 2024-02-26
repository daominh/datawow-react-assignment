import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Checkbox.module.scss";
import clsx from "clsx";

const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={clsx(styles.checkbox, className)}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
