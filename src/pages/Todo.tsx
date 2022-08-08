import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { QUERY_KEY } from "../constants/queryKey";
import { TodoModel, PaginationModel } from "../models";

interface TodoItemProps {
  todo: TodoModel;
}

const Todo = () => {
  const [page, setPage] = useState(1);

  /**
   * useQuery를 이용한 pagination
   * keepPreviousData 사용
   *
   * @returns todoList
   */
  const { status, data } = useQuery({
    queryKey: [QUERY_KEY.TODO_LIST_QUERY, page],
    queryFn: async (): Promise<{ todos: TodoModel[] } & PaginationModel> => {
      return await fetch(`https://dummyjson.com/todos?limit=${page * 10}`).then(
        (res) => res.json()
      );
    },
    keepPreviousData: true,
  });

  /**
   * auto save
   */

  if (status === "loading") return <>Loading</>;
  return (
    <div>
      {data?.todos.map((todo) => (
        <React.Fragment key={`${todo.userId}_${todo.id}`}>
          <TodoItem todo={todo} />
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => setPage(page + 1)}>더보기</button>
      </div>
    </div>
  );
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [info, setInfo] = useState(todo);

  const onUpdateSubmit = useMutation(async (data: TodoModel) => {
    return await fetch(`https://dummyjson.com/todos/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: data.todo,
      }),
    }).then((res) => res.json());
  });

  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInfo((prev) => {
      return { ...prev, todo: value };
    });
  };

  // setState 동기처럼 처리
  useEffect(() => {
    if (todo.todo !== info.todo) {
      onUpdateSubmit.mutate(info);
    }
  }, [info.todo]);

  return (
    <div>
      <input
        type="text"
        value={info.todo}
        size={100}
        onChange={(e) => updateContent(e)}
      />
    </div>
  );
};

export default Todo;
