"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useTodoStore } from "../_hooks/useTodoStore";
import { TodoStatus } from "@/types/todo";
import toast from "react-hot-toast";

export default function TodoList() {
  const { todos, toggleTodo, removeTodo, selectStatus } = useTodoStore();
  const todosData = todos.filter((todo) => todo.status === TodoStatus.TODO);
  return (
    <div>
      <h1 className="text-center p-3 font-extrabold text-orange-400">Todo</h1>
      {todosData.map((todo) => (
        <Card
          key={todo.id}
          className={`p-4 mb-2 ${
            todo.completed ? "bg-orange-100" : ""
          } hover:scale-125`}
        >
          <div className="flex items-center gap-2 justify-between">
            <div className="flex  items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => {
                  if (todo && todo.id) {
                    toggleTodo(todo.id);
                  }
                  toast.success("Toggled Todo");
                }}
              />
              <p className="text-sm">{todo.title}</p>
            </div>
            <Select
              onValueChange={(value: TodoStatus) => {
                if (todo && todo.id) {
                  selectStatus(todo.id, value);
                }
                console.log(`Status changed to: ${value}`);
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Todo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In-progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Trash2
              size={16}
              className="text-black hover:text-red-700"
              onClick={() => {
                if (todo && todo.id) {
                  removeTodo(todo.id);
                }
              }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
