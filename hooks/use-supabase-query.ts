import { supabase } from "@/lib/supabase";
import type { Todo, CreateTodoInput, UpdateTodoInput } from "@/lib/types";

export async function getTodos(): Promise<Todo[]> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(error);
    throw new Error("Todos could not be fetched");
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert({ text: todo.text, completed: false })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Created todo data is missing");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Todo could not be created");
  }
}

export async function updateTodo({ id, text }: UpdateTodoInput): Promise<void> {
  try {
    const { error } = await supabase
      .from("todos")
      .update({ text })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Todo could not be updated");
  }
}

export async function updateToggle(id: number): Promise<void> {
  try {
    const { data, error: fetchError } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id)
      .single();
    if (fetchError) throw fetchError;
    if (!data) throw new Error("Todo not found");

    const { error } = await supabase
      .from("todos")
      .update({ completed: !data.completed })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Todo could not be updated");
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Todo could not be deleted");
  }
}
