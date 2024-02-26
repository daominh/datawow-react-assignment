import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoSchema, TCreateTodo, TTodo } from "@/models";
import { editTodo } from "@/services/todos";
import { Button, Input } from "../ui";
import { useAppDispatch } from "@/store";
import { updateAppError } from "@/store/modules/common";
import styles from "../AddTodoForm/AddTodoForm.module.scss";

type EditTodoFormProps = {
  todo: TTodo;
  quitEditMode: () => void;
};

const EditTodoForm = (props: EditTodoFormProps) => {
  const { todo, quitEditMode } = props;

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      title: todo.title,
    },
    resolver: zodResolver(CreateTodoSchema),
  });

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: editTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      quitEditMode();
    },
    onError: (error) => {
      dispatch(updateAppError(error.message));
      const timeoutId = setTimeout(() => {
        setFocus("title");
        clearTimeout(timeoutId);
      });
    },
  });

  const clearError = () => {
    if (mutationError) {
      dispatch(updateAppError(""));
    }
  };

  const onSubmit = ({ title }: TCreateTodo) => {
    if (title === todo.title) {
      quitEditMode();
    }

    const todoToEdit = {
      ...todo,
      title,
    };

    mutate(todoToEdit);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              disabled={isPending}
              placeholder="Add your todo..."
              onChange={(e) => {
                field.onChange(e);
                clearError();
              }}
            />
          )}
        />
        <Button className={styles.submitBtn} type="submit">
          Save
        </Button>
      </form>
      {formErrors.title && (
        <div className={styles.formErrorMessage}>
          {formErrors.title.message}
        </div>
      )}
    </div>
  );
};

export { EditTodoForm };
