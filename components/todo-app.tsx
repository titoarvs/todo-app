"use client";

import { useState } from "react";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";
import { TodoFilter } from "./todo-filter";
import { useTodos } from "@/hooks/use-todos";

export type FilterType = "all" | "active" | "completed";

export default function TodoApp() {
  const [filter, setFilter] = useState<FilterType>("all");
  const {
    todos,
    totalTodos,
    activeTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    isLoading,
  } = useTodos(filter);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TodoForm onAddTodo={addTodo} isLoading={isLoading} />

      <TodoFilter filter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={todos}
        isLoading={isLoading}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <div className="mt-4 text-sm text-gray-500">
        {totalTodos === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          <p>
            {activeTodos} remaining out of {totalTodos} tasks
          </p>
        )}
      </div>
    </div>
  );
}
