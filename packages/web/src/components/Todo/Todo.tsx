import styles from "./Todo.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { TTodo } from "@/models";
import { TodoActionsMenu } from "../TodoActionsMenu";
import { EditTodoForm } from "../EditTodoForm";
import { ToggleStatusTodo } from "..";

const Todo = ({ todo }: { todo: TTodo }) => {
  const [editMode, setEditMode] = useState(false);

  const quitEditMode = () => {
    setEditMode(false);
  };

  if (editMode) {
    return <EditTodoForm todo={todo} quitEditMode={quitEditMode} />;
  }

  return (
    <div className={styles.todo}>
      <ToggleStatusTodo todo={todo} />
      <span
        className={clsx(styles.title, todo.completed && styles.titleCompleted)}
      >
        {todo.title}
      </span>
      <TodoActionsMenu todoId={todo.id} onEdit={() => setEditMode(true)} />
    </div>
  );
};

export { Todo };
