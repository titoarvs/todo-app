"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Todo } from "@/types/todo";
import { useTodoStore } from "../_hooks/useTodoStore";

export const TodoForm = () => {
  const { addTodo } = useTodoStore();

  const form = useForm<Todo>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmitForm = (data: Todo) => {
    console.log("🚀 ~ onSubmitForm ~ data:", data);
    addTodo(data.title);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex gap-2 px-32 mt-5"
      >
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Todo is required" }}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Add a new todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Todo</Button>
      </form>
    </Form>
  );
};
