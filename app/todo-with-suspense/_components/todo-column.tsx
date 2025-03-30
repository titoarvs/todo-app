import React from "react";
import TodoList from "./todo-list";

export default async function TodoColumn() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <TodoList />
    </div>
  );
}
