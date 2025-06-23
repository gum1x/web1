"use client";

import React from "react";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IList } from "@/libs/db/models/BoardModel";
import { DraggableCard } from "./DraggableCard";
import { CreateCardForm } from "./CreateCardForm";
import { GripVertical } from "lucide-react";

interface DraggableListProps {
  list: IList;
  boardId: string;
}

export function DraggableList({ list, boardId }: DraggableListProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isListDragging,
  } = useSortable({
    id: String(list._id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`bg-card border border-border rounded-lg p-4 w-80 flex-shrink-0 ${isListDragging ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button {...attributes} {...listeners} className="p-1 hover:bg-muted rounded cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          <h3 className="font-semibold text-foreground">{list.title}</h3>
        </div>
        <span className="text-sm text-muted-foreground">{list.cards.length} cards</span>
      </div>

      <div className="space-y-2 mb-4">
        <SortableContext items={list.cards.map((card) => String(card._id))} strategy={verticalListSortingStrategy}>
          {list.cards.map((card) => (
            <DraggableCard key={String(card._id)} card={card} listId={String(list._id)} />
          ))}
        </SortableContext>
      </div>

      <CreateCardForm boardId={boardId} listId={String(list._id)} />
    </div>
  );
}
