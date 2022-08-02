import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { TodoModel } from "../models";

const Todo = () => {
  const todoList = useQuery({
    queryKey: [QUERY_KEY.TODO_LIST_QUERY],
    queryFn: async (): Promise<TodoModel[]> => {
      return await fetch("https://jsonplaceholder.typicode.com/todos").then(
        (response) => response.json()
      );
    },
    networkMode: "online",
  });

  return (
    <div>
      {todoList.data?.map((item) => (
        <div>{item.id}</div>
      ))}
    </div>
  );
};

export default Todo;
