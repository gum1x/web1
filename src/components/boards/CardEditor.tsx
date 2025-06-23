"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { X, Edit } from "lucide-react";
import { updateCard } from "@/app/actions/boards";
import { ICard } from "@/libs/db/models/BoardModel";

interface CardEditorProps {
  card: ICard;
  listId: string;
  boardId: string;
  onClose: () => void;
}

export function CardEditor({ card, listId, boardId, onClose }: CardEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, textareaRef.current.value.length, textareaRef.current.value.length)}px`;
    }
  }, [isEditing]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await updateCard(boardId, listId, String(card._id), formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update card:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function formatDescription(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Edit Card</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="h-6 px-2">
              <Edit className="h-4 w-4 mr-1" />
              {isEditing ? "Preview" : "Edit"}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isEditing ? (
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={card.title}
                required
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                ref={textareaRef}
                id="description"
                name="description"
                defaultValue={card.description || ""}
                rows={8}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Add a description... (supports **bold** and *italic*)"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">{card.title}</h3>
              {card.description && (
                <div
                  className="text-sm text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatDescription(card.description) }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
