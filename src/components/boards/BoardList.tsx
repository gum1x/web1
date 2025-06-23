import { Board } from "@/libs/db/models/BoardModel";
import { connectDB } from "@/libs/db/mongoose";
import { requireAuth } from "@/libs/auth";
import { BoardCard } from "./BoardCard";

interface LeanBoard {
  _id: string;
  title: string;
  description?: string;
  owner: string;
  lists: Array<{
    _id: string;
    title: string;
    order: number;
    cards: Array<{
      _id: string;
      title: string;
      description?: string;
      order: number;
    }>;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export async function BoardList() {
  await connectDB();
  const user = await requireAuth();

  const boards = (await Board.find({ owner: user.userId }).sort({ createdAt: -1 }).lean()) as unknown as LeanBoard[];

  if (boards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No boards yet</h3>
        <p className="text-muted-foreground">Create your first board to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} />
      ))}
    </div>
  );
}
