import { getTodos } from "@/services/todos";
import { useQuery } from "@tanstack/react-query";

const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

export { useTodosQuery };
