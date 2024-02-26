import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  return (
    <button className={clsx(styles.button, className)} ref={ref} {...props} />
  );
});

Button.displayName = "Button";

export { Button };
