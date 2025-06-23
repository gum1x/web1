"use client";

import React, { createContext, useState, useCallback, useContext } from "react";
import { IBoard } from "@/libs/db/models/BoardModel";

interface BoardContextType {
  currentBoard: IBoard | null;
  setCurrentBoard: (board: IBoard | null) => void;
  refreshBoard: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
  const refreshBoard = useCallback(() => {}, []);

  return <BoardContext.Provider value={{ currentBoard, setCurrentBoard, refreshBoard }}>{children}</BoardContext.Provider>;
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoardContext must be used within a BoardProvider");
  return context;
};
