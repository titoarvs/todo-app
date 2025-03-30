"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListSkeleton() {
  return (
    <div>
      <h1 className="text-center align-middle p-3 font-extrabold">
        <Skeleton className="h-4 w-[100px]" />
      </h1>
      {[1, 2, 3].map((index) => (
        <Card key={index} className="p-4 mb-2">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-[160px]" />
            <Skeleton className="h-4 w-4" />
          </div>
        </Card>
      ))}
    </div>
  );
}
