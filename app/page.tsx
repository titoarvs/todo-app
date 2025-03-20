import TodoApp from "@/components/todo-app";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-4 bg-gray-50 py-14">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Todo App
        </h1>
        <TodoApp />
      </div>
    </main>
  );
}
