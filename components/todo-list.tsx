"use client";

import { useState } from "react";
import type { Todo, UpdateTodoInput } from "@/lib/types";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (data: UpdateTodoInput) => void;
}

export function TodoList({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <>
      <div className="h-80 overflow-y-scroll">
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-4 text-gray-500">
              No tasks to display
            </li>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                isLoading={isLoading}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={(data) => {
                  onEdit(data);
                  setEditingId(null);
                }}
                onStartEdit={() => setEditingId(todo.id)}
                onCancelEdit={() => setEditingId(null)}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
}
