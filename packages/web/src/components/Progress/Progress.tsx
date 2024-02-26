import { useMemo } from "react";
import { useTodosQuery } from "@/hooks";
import styles from "./Progress.module.scss";

const Progress = () => {
  const { data: todos } = useTodosQuery();

  const progress = useMemo(() => {
    if (!todos || todos.length === 0) {
      return {
        number: 0,
        length: -100,
      };
    }

    const completedTodos = todos.filter((todo) => todo.completed);
    const percentage = (completedTodos.length / todos.length) * 100;

    return {
      number: completedTodos.length,
      length: -100 + percentage,
    };
  }, [todos]);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressTitle}>Progress</div>
      <div className={styles.progressOuter}>
        <div
          style={{ transform: `translateX(${progress.length}%)` }}
          className={styles.progressInner}
        ></div>
      </div>
      <div className={styles.progressNumber}>{progress.number} Completed</div>
    </div>
  );
};

export { Progress };
