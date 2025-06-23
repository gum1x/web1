"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import { createList } from "@/app/actions/boards";

interface CreateListFormProps {
  boardId: string;
}

export function CreateListForm({ boardId }: CreateListFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await createList(boardId, formData);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create list:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add List
      </Button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Create New List</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
            List Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter list title..."
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Creating..." : "Create List"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
