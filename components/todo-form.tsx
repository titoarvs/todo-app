"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Loader2 } from "lucide-react"
import { type CreateTodoInput, createTodoSchema } from "@/lib/types"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

interface TodoFormProps {
  onAddTodo: (data: CreateTodoInput) => void
  isLoading: boolean
}

export function TodoForm({ onAddTodo, isLoading }: TodoFormProps) {
  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      text: "",
    },
  })

  const handleSubmit = (data: CreateTodoInput) => {
    onAddTodo(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-6">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Add a new task..." disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PlusCircle className="h-4 w-4 mr-2" />}
            Add
          </Button>
        </div>
      </form>
    </Form>
  )
}

