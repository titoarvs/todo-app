import React from "react";
import InprogressList from "./inprogress-list";

export default async function InprogressColumn() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <div>
      <InprogressList />
    </div>
  );
}
