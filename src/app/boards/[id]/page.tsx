"use client";

import { IBoard } from "@/libs/db/models/BoardModel";
import { DraggableBoard } from "@/components/boards/DraggableBoard";
import { CreateListForm } from "@/components/boards/CreateListForm";
import { useEffect, useState } from "react";
import { getBoard } from "@/app/actions/boards";
import "../boardStyles.css";

interface BoardPageProps {
  params: {
    id: string;
  };
}

const createDemoBoard = (): IBoard => {
  return {
    _id: "demo-board-1",
    title: "Demo Board",
    description: "A demo board to test drag-and-drop functionality",
    owner: "demo-user",
    lists: [
      {
        _id: "list-1",
        title: "To Do",
        order: 0,
        cards: [
          {
            _id: "card-1",
            title: "Design homepage",
            description: "Create wireframes and mockups",
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            _id: "card-2",
            title: "Setup database",
            description: "Configure MongoDB connection",
            order: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "list-2",
        title: "In Progress",
        order: 1,
        cards: [
          {
            _id: "card-3",
            title: "Build components",
            description: "Create reusable UI components",
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "list-3",
        title: "Done",
        order: 2,
        cards: [
          {
            _id: "card-4",
            title: "Project setup",
            description: "Initialize Next.js project",
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as IBoard;
};

export default function BoardPage({ params }: BoardPageProps) {
  const [board, setBoard] = useState<IBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function loadBoard() {
      try {
        if (params.id.startsWith("demo-")) {
          setIsDemo(true);
          setBoard(createDemoBoard());
        } else {
          const foundBoard = await getBoard(params.id);
          setBoard(foundBoard);
        }
      } catch {
        console.log("Database connection failed, using demo mode");
        setIsDemo(true);
        setBoard(createDemoBoard());
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

  if (board === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Board not found</div>
      </div>
    );
  }

  return (
    <div className="boardhub-bg">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{board.title}</h1>
              {board.description && <p className="text-muted-foreground mt-1">{board.description}</p>}
              {isDemo && <p className="text-sm text-blue-600 mt-1">Demo mode - Drag and drop to test functionality</p>}
            </div>
            {!isDemo && <CreateListForm boardId={String(board._id)} />}
          </div>
        </div>
      </div>

      <div className="flex-1 boardhub-scroll">
        <DraggableBoard
          board={board}
          onBoardUpdate={(updatedBoard) => {
            setBoard(updatedBoard);
            if (isDemo) {
              console.log("Demo board updated:", updatedBoard);
            }
          }}
        />
      </div>
    </div>
  );
}
