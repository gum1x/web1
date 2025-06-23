import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  title: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IList extends Document {
  title: string;
  order: number;
  cards: ICard[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard extends Document {
  title: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  lists: IList[];
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const listSchema = new Schema<IList>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    cards: [cardSchema],
  },
  {
    timestamps: true,
  }
);

const boardSchema = new Schema<IBoard>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lists: [listSchema],
  },
  {
    timestamps: true,
  }
);

boardSchema.index({ owner: 1, createdAt: -1 });
boardSchema.index({ "lists.order": 1 });
boardSchema.index({ "lists.cards.order": 1 });

export const Board = mongoose.models.Board || mongoose.model<IBoard>("Board", boardSchema);
