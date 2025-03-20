"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import { type Todo, type UpdateTodoInput, updateTodoSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (data: UpdateTodoInput) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
}

export function TodoItem({
  todo,
  isEditing,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
  onStartEdit,
  onCancelEdit,
}: TodoItemProps) {
  const form = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      id: todo.id,
      text: todo.text,
    },
  });

  const handleEditSubmit = (data: UpdateTodoInput) => {
    console.log("Edited");
    onEdit(data);
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 p-3 border rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditSubmit)}
            className="flex items-center gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1 m-0">
                  <FormControl>
                    <Input {...field} autoFocus disabled={isLoading} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              size="icon"
              variant="ghost"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              <span className="sr-only">Save</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </form>
        </Form>
      </li>
    );
  }

  return (
    <li
      className={`flex items-center gap-2 p-3 border rounded-md ${
        todo.completed ? "bg-gray-50" : ""
      }`}
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        disabled={isLoading}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button
        size="icon"
        variant="ghost"
        onClick={onStartEdit}
        disabled={todo.completed || isLoading}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onDelete(todo.id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        <span className="sr-only">Delete</span>
      </Button>
    </li>
  );
}
