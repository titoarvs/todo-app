"use client";

import { Todo } from "@/types/todo";
import { useState } from "react";
import toast from "react-hot-toast";

export const useTodo = () => {
  const [todos, setTodo] = useState<Todo[]>([]);

  const addTodo = (todoData: Todo) => {
    setTodo([
      ...todos,
      { id: crypto.randomUUID(), title: todoData.title, completed: false },
    ]);
    toast.success(`Added successfully `);
  };

  const removeTodo = (todoId: string) => {
    setTodo(todos.filter((todo) => todo.id !== todoId));

    toast.error(`Deleted successfully `);
  };

  const toggleTodo = (todoId: string) => {
    setTodo(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toast.success(`Toggled successfully `);
  };

  return {
    addTodo,
    todos,
    removeTodo,
    toggleTodo,
  };
};
