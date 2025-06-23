"use client";

import { useState } from "react";
import { ICard } from "@/libs/db/models/BoardModel";
import { CardEditor } from "./CardEditor";
import { Button } from "@/components/ui/Button";
import { Edit3, Trash2 } from "lucide-react";
import { deleteCard } from "@/app/actions/boards";

interface CardProps {
  card: ICard;
  listId: string;
  boardId: string;
}

export function Card({ card, listId, boardId }: CardProps) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      <div className="group relative bg-card border border-border rounded-md p-3 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-foreground flex-1">{card.title}</h4>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowEditor(true)}>
              <Edit3 className="h-3 w-3" />
            </Button>
            <form action={deleteCard.bind(null, boardId, listId, String(card._id))}>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </form>
          </div>
        </div>

        {card.description && <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>}
      </div>

      {showEditor && <CardEditor card={card} listId={listId} boardId={boardId} onClose={() => setShowEditor(false)} />}
    </>
  );
}
