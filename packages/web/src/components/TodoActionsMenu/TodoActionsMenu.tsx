import * as Popover from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/services/todos";
import { TTodo } from "@/models";
import { Button } from "../ui";
import { useAppDispatch } from "@/store";
import { updateAppError } from "@/store/modules/common";
import styles from "./TodoActionsMenu.module.scss";

type TodoActionsMenuProps = {
  onEdit: () => void;
  todoId: TTodo["title"];
};

const TodoActionsMenu = (props: TodoActionsMenuProps) => {
  const { onEdit, todoId } = props;

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      dispatch(updateAppError(error.message));
    },
  });

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button className={styles.triggerBtn}>
          <MoreHorizontal />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.dropdownMenu} sideOffset={5}>
          <ul>
            <li>
              <Button
                className={clsx(styles.actionBtn, styles.editBtn)}
                onClick={onEdit}
              >
                Edit
              </Button>
            </li>
            <li>
              <Button
                className={clsx(styles.actionBtn, styles.deleteBtn)}
                disabled={isDeleting}
                onClick={() => mutate(todoId)}
              >
                Delete
              </Button>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export { TodoActionsMenu };
