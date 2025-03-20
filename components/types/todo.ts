export type UpdateTodoInput = {
  id: number;
  updates: Partial<
    Omit<{ completed: boolean; id: number; text: string }, "id">
  >;
};
export type Todo = {
  completed: boolean;
  id: number;
  text: string;
};
export type CreateTodoInput = {
  text: string;
};
