import { TTodo, TodoSchema } from "../models";
import { config } from "../shared/config";

export const getTodos = async (): Promise<TTodo[]> => {
  const response = await fetch(`${config.API_URL}/todos`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const todos = TodoSchema.array().parse(data);
  return todos;
};

export const addTodo = async (newTodo: TTodo): Promise<TTodo> => {
  const response = await fetch(`${config.API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const todo = TodoSchema.parse(data);
  return todo;
};

export const editTodo = async (todoToEdit: TTodo): Promise<TTodo> => {
  const response = await fetch(`${config.API_URL}/todos/${todoToEdit.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoToEdit),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const todo = TodoSchema.parse(data);
  return todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${config.API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
