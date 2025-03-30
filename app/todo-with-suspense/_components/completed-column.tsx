import React from "react";
import CompletedList from "./completed-list";

export default async function CompletedColumn() {
  await new Promise((resolve) => setTimeout(resolve, 8000));
  return (
    <div>
      <CompletedList />
    </div>
  );
}
