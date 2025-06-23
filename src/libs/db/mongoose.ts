"use server";

import { Connection, connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

let connection: Connection | null = null;

export async function connectDB(): Promise<Connection> {
  if (connection) {
    return connection;
  }

  try {
    const mongooseInstance = await connect(MONGO_URI!);
    connection = mongooseInstance.connection;
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}
