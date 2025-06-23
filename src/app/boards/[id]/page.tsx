"use client";

import { IBoard } from "@/libs/db/models/BoardModel";
import { DraggableBoard } from "@/components/boards/DraggableBoard";
import { CreateListForm } from "@/components/boards/CreateListForm";
import { useEffect, useState } from "react";
import { getBoard } from "@/app/actions/boards";

interface BoardPageProps {
  params: {
    id: string;
  };
}

export default function BoardPage({ params }: BoardPageProps) {
  const [board, setBoard] = useState<IBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBoard() {
      try {
        const foundBoard = await getBoard(params.id);
        setBoard(foundBoard);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load board");
      } finally {
        setLoading(false);
      }
    }

    loadBoard();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading board...</div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Board not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{board.title}</h1>
              {board.description && <p className="text-muted-foreground mt-1">{board.description}</p>}
            </div>
            <CreateListForm boardId={String(board._id)} />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <DraggableBoard
          board={board}
          onBoardUpdate={(updatedBoard) => {
            setBoard(updatedBoard);
          }}
        />
      </div>
    </div>
  );
}
