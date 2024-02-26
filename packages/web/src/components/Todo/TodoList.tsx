import { useAppSelector } from "@/store";
import { Todo } from "./Todo";
import styles from "./Todo.module.scss";
import { useTodosQuery } from "@/hooks";
import { useMemo } from "react";

const TodoList = () => {
  const { data: todos, isPending, error } = useTodosQuery();

  const todoFilter = useAppSelector((state) => state.todo.filter);

  const filteredTodos = useMemo(() => {
    if (todoFilter === "All") {
      return todos;
    }

    return todos?.filter((todo) => {
      if (todoFilter === "Done") {
        return todo.completed;
      }

      return !todo.completed;
    });
  }, [todos, todoFilter]);

  if (isPending) {
    return <div className={styles.common}>Loading...</div>;
  }

  if (filteredTodos?.length === 0) {
    return <div className={styles.common}>No todos</div>;
  }

  if (error) {
    return (
      <div className={styles.common}>
        {error.message || "Something went wrong. Please reload."}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredTodos?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export { TodoList };
