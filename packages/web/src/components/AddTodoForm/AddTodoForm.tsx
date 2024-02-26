import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoSchema, TCreateTodo } from "../../models";
import { addTodo } from "../../services/todos";
import { Button, Input } from "../ui";
import styles from "./AddTodoForm.module.scss";
import { useAppDispatch } from "@/store";
import { updateAppError } from "@/store/modules/common";

const AddTodoForm = () => {
  const {
    control,
    reset: resetForm,
    handleSubmit,
    setFocus,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(CreateTodoSchema),
  });

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: addTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      resetForm();
    },
    onError: (error) => {
      dispatch(updateAppError(error.message));
      const timeoutId = setTimeout(() => {
        setFocus("title");
        clearTimeout(timeoutId);
      });
    },
  });

  const clearMutationError = () => {
    if (mutationError) {
      dispatch(updateAppError(""));
    }
  };

  const onSubmit = ({ title }: TCreateTodo) => {
    const newTodo = {
      title,
      id: uuidv4(),
      completed: false,
    };

    mutate(newTodo);
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
                clearMutationError();
              }}
            />
          )}
        />
        <Button className={styles.submitBtn} type="submit">
          Add
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

export { AddTodoForm };
