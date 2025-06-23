"use server";

import { Board, IList, ICard } from "@/libs/db/models/BoardModel";
import { connectDB } from "@/libs/db/mongoose";
import { requireAuth } from "@/libs/auth";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/libs/rateLimiter";
import { logAuditEvent } from "@/libs/audit";
import { headers } from "next/headers";

async function getClientIP(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
}

export async function createBoard(formData: FormData) {
  const clientIP = await getClientIP();

  if (!rateLimit(`createBoard:${clientIP}`, 5, 60000)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  try {
    await connectDB();
    const user = await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const board = await Board.create({
      title,
      description,
      owner: user.userId,
      lists: [],
    });

    await logAuditEvent(user.userId, "create", "board", board._id.toString(), {
      title,
      description,
    });

    revalidatePath("/boards");
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create board");
  }
}

export async function updateBoard(boardId: string, formData: FormData) {
  try {
    await connectDB();
    const user = await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const board = await Board.findOneAndUpdate({ _id: boardId, owner: user.userId }, { title, description }, { new: true });

    if (!board) {
      throw new Error("Board not found");
    }

    await logAuditEvent(user.userId, "update", "board", boardId, {
      title,
      description,
    });

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update board");
  }
}

export async function deleteBoard(boardId: string) {
  try {
    await connectDB();
    const user = await requireAuth();

    const board = await Board.findOneAndDelete({ _id: boardId, owner: user.userId });

    if (!board) {
      throw new Error("Board not found");
    }

    await logAuditEvent(user.userId, "delete", "board", boardId);

    revalidatePath("/boards");
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to delete board");
  }
}

export async function createList(boardId: string, formData: FormData) {
  const clientIP = await getClientIP();

  if (!rateLimit(`createList:${clientIP}`, 10, 60000)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  try {
    await connectDB();
    const user = await requireAuth();

    const title = formData.get("title") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const maxOrder = Math.max(0, ...board.lists.map((list: IList) => list.order));

    board.lists.push({
      title,
      order: maxOrder + 1,
      cards: [],
    });

    await board.save();

    const newList = board.lists[board.lists.length - 1];
    await logAuditEvent(user.userId, "create", "list", newList._id.toString(), {
      title,
      boardId,
    });

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create list");
  }
}

export async function createCard(boardId: string, listId: string, formData: FormData) {
  const clientIP = await getClientIP();

  if (!rateLimit(`createCard:${clientIP}`, 20, 60000)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  try {
    await connectDB();
    const user = await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const list = board.lists.id(listId);
    if (!list) {
      throw new Error("List not found");
    }

    const maxOrder = Math.max(0, ...list.cards.map((card: ICard) => card.order));

    list.cards.push({
      title,
      description,
      order: maxOrder + 1,
    });

    await board.save();

    const newCard = list.cards[list.cards.length - 1];
    await logAuditEvent(user.userId, "create", "card", newCard._id.toString(), {
      title,
      description,
      listId,
      boardId,
    });

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create card");
  }
}

export async function updateCard(boardId: string, listId: string, cardId: string, formData: FormData) {
  try {
    await connectDB();
    const user = await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const list = board.lists.id(listId);
    if (!list) {
      throw new Error("List not found");
    }

    const card = list.cards.id(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    card.title = title;
    card.description = description;

    await board.save();

    await logAuditEvent(user.userId, "update", "card", cardId, {
      title,
      description,
      listId,
      boardId,
    });

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update card");
  }
}

export async function deleteCard(boardId: string, listId: string, cardId: string) {
  try {
    await connectDB();
    const user = await requireAuth();

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const list = board.lists.id(listId);
    if (!list) {
      throw new Error("List not found");
    }

    const card = list.cards.id(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    card.deleteOne();
    await board.save();

    await logAuditEvent(user.userId, "delete", "card", cardId, {
      listId,
      boardId,
    });

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to delete card");
  }
}

export async function updateCardOrder(boardId: string, listId: string, cardId: string, newOrder: number) {
  try {
    await connectDB();
    const user = await requireAuth();

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const list = board.lists.id(listId);
    if (!list) {
      throw new Error("List not found");
    }

    const card = list.cards.id(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    card.order = newOrder;
    await board.save();

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update card order");
  }
}

export async function updateListOrder(boardId: string, listId: string, newOrder: number) {
  try {
    await connectDB();
    const user = await requireAuth();

    const board = await Board.findOne({ _id: boardId, owner: user.userId });
    if (!board) {
      throw new Error("Board not found");
    }

    const list = board.lists.id(listId);
    if (!list) {
      throw new Error("List not found");
    }

    list.order = newOrder;
    await board.save();

    revalidatePath(`/boards/${boardId}`);
    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update list order");
  }
}

export async function getBoard(boardId: string) {
  try {
    await connectDB();
    const user = await requireAuth();

    const board = await Board.findOne({
      _id: boardId,
      owner: user.userId,
    }).populate("lists");

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to get board");
  }
}
