"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createCard } from "@/app/actions/boards";
import { Plus } from "lucide-react";

interface CreateCardFormProps {
  listId: string;
  boardId: string;
}

export function CreateCardForm({ listId, boardId }: CreateCardFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      await createCard(boardId, listId, formData);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create card:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
        <Plus className="h-4 w-4 mr-2" />
        Add card
      </Button>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Card title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          autoFocus
          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>

      <div className="flex space-x-2">
        <Button type="submit" disabled={isLoading} size="sm">
          {isLoading ? "Creating..." : "Create card"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
