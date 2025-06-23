import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/auth";
import { BoardList } from "@/components/boards/BoardList";
import { CreateBoardForm } from "@/components/boards/CreateBoardForm";

export default async function BoardsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Boards</h1>
        <p className="text-muted-foreground">Manage your team's projects and tasks</p>
      </div>

      <div className="grid gap-6">
        <CreateBoardForm />
        <BoardList />
      </div>
    </div>
  );
}
