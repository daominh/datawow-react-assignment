import { TTodo } from "@/models";
import { Checkbox } from "../ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "@/services/todos";

const ToggleStatusTodo = ({ todo }: { todo: TTodo }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleComplete = () => {
    mutate({ ...todo, completed: !todo.completed });
  };

  return (
    <Checkbox
      checked={todo.completed}
      name="completed"
      onChange={toggleComplete}
      disabled={isPending}
    />
  );
};

export { ToggleStatusTodo };
