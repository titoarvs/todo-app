"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useTodoStore } from "../_hooks/useTodoStore";
import { TodoStatus } from "@/types/todo";

const CompletedList = () => {
  const { todos, toggleTodo, removeTodo } = useTodoStore();
  const completedData = todos.filter(
    (todo) => todo.status === TodoStatus.COMPLETED
  );
  return (
    <>
      <div>
        <h1 className="text-center p-3 font-extrabold text-green-400">
          Completed
        </h1>
        {completedData.map((todo) => (
          <Card
            key={todo.id}
            className={`p-4 mb-2 ${
              todo.completed ? "bg-green-100" : ""
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
                  }}
                />
                <p className="text-sm">{todo.title}</p>
              </div>
              <Select disabled={true}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Todo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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
    </>
  );
};

export default CompletedList;
