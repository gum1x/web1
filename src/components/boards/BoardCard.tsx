import Link from "next/link";
import { IBoard } from "@/libs/db/models/BoardModel";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { deleteBoard } from "@/app/actions/boards";

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

interface BoardCardProps {
  board: IBoard | LeanBoard;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <div className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">{board.title}</h3>
        <form action={deleteBoard.bind(null, String(board._id))}>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
            <Trash2 className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {board.description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{board.description}</p>}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{board.lists.length} lists</span>
        <span>{board.lists.reduce((acc, list) => acc + list.cards.length, 0)} cards</span>
      </div>

      <Link href={`/boards/${String(board._id)}`} className="absolute inset-0">
        <span className="sr-only">Open board</span>
      </Link>
    </div>
  );
}
