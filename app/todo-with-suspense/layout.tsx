import React from "react";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center">
          Todo App with Suspense
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
