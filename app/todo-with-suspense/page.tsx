import React, { Suspense } from "react";
import { TodoForm } from "./_components/todo-form";
import { Toaster } from "react-hot-toast";
import TodoColumn from "./_components/todo-column";
import InprogressColumn from "./_components/inprogress-column";
import CompletedColumn from "./_components/completed-column";
import ListSkeleton from "./_components/list-skeleton";

export default function Home() {
  return (
    <>
      <TodoForm />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 mt-5">
        <Suspense fallback={<ListSkeleton />}>
          <TodoColumn />
        </Suspense>
        <Suspense fallback={<ListSkeleton />}>
          <InprogressColumn />
        </Suspense>
        <Suspense fallback={<ListSkeleton />}>
          <CompletedColumn />
        </Suspense>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
