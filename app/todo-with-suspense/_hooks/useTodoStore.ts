"use client";

import { Todo, TodoStatus } from "@/types/todo";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  selectStatus: (id: string, status: TodoStatus) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title: text,
          completed: false,
          status: TodoStatus.TODO,
        },
      ],
    })),

  removeTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  selectStatus: (id: string, status: TodoStatus) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      ),
    })),
}));
