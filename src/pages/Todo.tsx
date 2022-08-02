import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { QUERY_KEY } from "../constants/queryKey";
import { TodoModel, PaginationModel } from "../models";

/**
 * useQuery를 이용한 pagination
 * keepPreviousData 사용
 *
 * @returns todoList
 */
const Todo = () => {
  const [page, setPage] = useState(0);

  const { status, data } = useQuery({
    queryKey: [QUERY_KEY.TODO_LIST_QUERY, page],
    queryFn: async (): Promise<{ todos: TodoModel[] } & PaginationModel> => {
      return await fetch(
        `https://dummyjson.com/todos?limit=10&skip=${page * 10}`
      ).then((res) => res.json());
    },
    keepPreviousData: true,
  });

  if (status === "loading") return <>Loading</>;
  return (
    <div>
      {data?.todos.map((todo) => (
        <div key={`${todo.userId}_${todo.id}`}>{todo.todo}</div>
      ))}
      <div>
        <ul>
          <li onClick={() => setPage(0)}>1</li>
          <li onClick={() => setPage(1)}>2</li>
          <li onClick={() => setPage(2)}>3</li>
        </ul>
      </div>
    </div>
  );
};

export default Todo;
