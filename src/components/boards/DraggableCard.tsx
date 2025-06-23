"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ICard } from "@/libs/db/models/BoardModel";

interface DraggableCardProps {
  card: ICard;
  listId: string;
}

export function DraggableCard({ card, listId }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(card._id),
    data: {
      type: "card",
      card,
      listId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`boardhub-card${isDragging ? " dragging" : ""}`}>
      <h4 className="font-medium text-foreground mb-1">{card.title}</h4>
      {card.description && <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>}
    </div>
  );
}
