import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./AppErrorMessage.module.scss";
import { AlertCircle } from "lucide-react";
import { updateAppError } from "@/store/modules/common";

const AppErrorMessage = () => {
  const message = useAppSelector((state) => state.common.appError);
  const dispatch = useAppDispatch();

  if (!message) {
    return null;
  }
  return (
    <button
      className={styles.messageContainer}
      onClick={() => dispatch(updateAppError(""))}
    >
      <AlertCircle />
      <div className={styles.messageText}>{message}</div>
    </button>
  );
};

export { AppErrorMessage };
