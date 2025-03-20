"use client"

import type { FilterType } from "./todo-app"
import { Button } from "@/components/ui/button"

interface TodoFilterProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => onFilterChange("all")}>
        All
      </Button>
      <Button variant={filter === "active" ? "default" : "outline"} size="sm" onClick={() => onFilterChange("active")}>
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>
    </div>
  )
}

