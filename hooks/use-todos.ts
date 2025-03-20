"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  updateToggle,
} from "./use-supabase-query";
import { FilterType, UpdateTodoInput } from "@/lib/types";

const filterTodoMap = {
  all: () => true,
  active: (todo: { completed: boolean }) => !todo.completed,
  completed: (todo: { completed: boolean }) => todo.completed,
};

export function useTodos(filter: FilterType = "all", queryKey: string[]) {
  const queryClient = useQueryClient();

  const { data: todos, isLoading: isFetching } = useQuery({
    queryKey,
    queryFn: getTodos,
    staleTime: 5000,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, text }: UpdateTodoInput) =>
      updateTodo({ id, text, completed: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateToggleMutation = useMutation({
    mutationFn: updateToggle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    todos: todos?.filter(filterTodoMap[filter]) ?? [],
    totalTodos: todos?.length ?? 0,
    activeTodos: todos?.filter(filterTodoMap.active).length ?? 0,
    addTodo: createTodoMutation.mutate,
    updateMutation: updateMutation.mutate,
    deleteMutation: deleteMutation.mutate,
    toggleTodo: updateToggleMutation.mutate,
    isLoading: isFetching,
  };
}
