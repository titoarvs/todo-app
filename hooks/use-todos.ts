"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTodoInput, UpdateTodoInput } from "@/lib/types";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./use-supabase-query";

export type FilterType = "all" | "active" | "completed";

const TODO_QUERY_KEY = ["todos"];

const filterTodoMap = {
  all: () => true,
  active: (todo: { completed: boolean }) => !todo.completed,
  completed: (todo: { completed: boolean }) => todo.completed,
};

export function useTodos(filter: FilterType = "all") {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery({
    queryKey: TODO_QUERY_KEY,
    queryFn: getTodos,
    staleTime: 3000,
  });

  const createMutation = <TInput, TOutput>(
    mutationFn: (input: TInput) => Promise<TOutput>
  ) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMutation({
      mutationFn,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY }),
    });

  const mutations = {
    add: createMutation(createTodo),
    toggle: createMutation(async (id: number) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      return updateTodo(id, { completed: !todo.completed });
    }),
    edit: createMutation(({ id, text }: UpdateTodoInput) =>
      updateTodo(id, { text })
    ),
    delete: createMutation(deleteTodo),
  };

  return {
    todos: todos.filter(filterTodoMap[filter]),
    totalTodos: todos.length,
    activeTodos: todos.filter(filterTodoMap.active).length,
    addTodo: (data: CreateTodoInput) => mutations.add.mutate(data),
    toggleTodo: (id: number) => mutations.toggle.mutate(id),
    editTodo: (data: UpdateTodoInput) => mutations.edit.mutate(data),
    deleteTodo: (id: number) => mutations.delete.mutate(id),
    isLoading: Object.values(mutations).some((mutation) => mutation.isPending),
  };
}
