import { supabase } from "@/lib/supabase";
import type { Todo, CreateTodoInput } from "@/lib/types";

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

export async function updateTodo(
  id: number,
  updates: Partial<Omit<Todo, "id">>
): Promise<void> {
  try {
    const { error } = await supabase.from("todos").update(updates).eq("id", id);
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
