export type Todo = {
  id?: string;
  title: string;
  completed?: boolean;
  status?: TodoStatus;
};

export enum TodoStatus {
  TODO = "todo",
  INPROGRESS = "in-progress",
  COMPLETED = "completed",
}
