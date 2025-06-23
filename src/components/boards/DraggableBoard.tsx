"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { IBoard, IList, ICard } from "@/libs/db/models/BoardModel";
import { DraggableList } from "./DraggableList";
import { updateListOrder, updateCardOrder } from "@/app/actions/boards";

interface DraggableBoardProps {
  board: IBoard;
  onBoardUpdate: (updatedBoard: IBoard) => void;
}

export function DraggableBoard({ board, onBoardUpdate }: DraggableBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const isDraggingList = board.lists.some((list) => String(list._id) === activeId);
    const isDraggingCard = board.lists.some((list) => list.cards.some((card) => String(card._id) === activeId));

    if (isDraggingList) {
      const activeList = board.lists.find((list) => String(list._id) === activeId);
      const overList = board.lists.find((list) => String(list._id) === overId);

      if (activeList && overList) {
        const oldIndex = board.lists.findIndex((list) => String(list._id) === activeId);
        const newIndex = board.lists.findIndex((list) => String(list._id) === overId);

        if (oldIndex !== newIndex) {
          try {
            await updateListOrder(String(board._id), activeId, newIndex);

            const newLists = [...board.lists];
            const [movedList] = newLists.splice(oldIndex, 1);
            newLists.splice(newIndex, 0, movedList);

            onBoardUpdate({
              ...board,
              lists: newLists.map((list, index) => ({ ...list, order: index })) as IList[],
            } as IBoard);
          } catch (error) {
            console.error("Failed to update list order:", error);
          }
        }
      }
    } else if (isDraggingCard) {
      const activeCard = findCardById(board, activeId);
      const overCard = findCardById(board, overId);

      if (activeCard && overCard) {
        const activeList = findListByCardId(board, activeId);
        const overList = findListByCardId(board, overId);

        if (activeList && overList) {
          const oldListId = String(activeList._id);
          const newListId = String(overList._id);
          const oldIndex = activeList.cards.findIndex((card) => String(card._id) === activeId);
          const newIndex = overList.cards.findIndex((card) => String(card._id) === overId);

          if (oldListId === newListId && oldIndex !== newIndex) {
            try {
              await updateCardOrder(String(board._id), oldListId, activeId, newIndex);

              const updatedBoard = { ...board };
              const listIndex = updatedBoard.lists.findIndex((list) => String(list._id) === oldListId);
              if (listIndex !== -1) {
                const newCards = [...updatedBoard.lists[listIndex].cards];
                const [movedCard] = newCards.splice(oldIndex, 1);
                newCards.splice(newIndex, 0, movedCard);
                updatedBoard.lists[listIndex].cards = newCards.map((card, index) => ({ ...card, order: index })) as ICard[];
                onBoardUpdate(updatedBoard as IBoard);
              }
            } catch (error) {
              console.error("Failed to update card order:", error);
            }
          } else if (oldListId !== newListId) {
            console.log("Card moved between lists - not implemented yet");
          }
        }
      }
    }
  };

  const findCardById = (board: IBoard, cardId: string): ICard | null => {
    for (const list of board.lists) {
      const card = list.cards.find((card) => String(card._id) === cardId);
      if (card) return card;
    }
    return null;
  };

  const findListByCardId = (board: IBoard, cardId: string): IList | null => {
    return board.lists.find((list) => list.cards.some((card) => String(card._id) === cardId)) || null;
  };

  const getActiveItem = () => {
    if (!activeId) return null;

    const activeList = board.lists.find((list) => String(list._id) === activeId);
    if (activeList) return { type: "list" as const, item: activeList };

    const activeCard = findCardById(board, activeId);
    if (activeCard) return { type: "card" as const, item: activeCard };

    return null;
  };

  const activeItem = getActiveItem();

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto min-h-full">
        <SortableContext items={board.lists.map((list) => String(list._id))} strategy={horizontalListSortingStrategy}>
          {board.lists.map((list) => (
            <DraggableList key={String(list._id)} list={list} boardId={String(board._id)} />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeItem ? (
          activeItem.type === "list" ? (
            <div className="bg-card border border-border rounded-lg p-4 w-80 shadow-lg opacity-90">
              <h3 className="font-semibold text-foreground mb-2">{activeItem.item.title}</h3>
              <div className="space-y-2">
                {activeItem.item.cards.map((card) => (
                  <div key={String(card._id)} className="bg-background border border-border rounded p-3">
                    <p className="text-sm text-foreground">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-3 w-72 shadow-lg opacity-90">
              <p className="font-medium text-foreground">{activeItem.item.title}</p>
              {activeItem.item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{activeItem.item.description}</p>}
            </div>
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
