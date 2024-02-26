import { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input className={clsx(styles.input, className)} ref={ref} {...props} />
    );
  }
);

Input.displayName = "Input";

export { Input };
