"use server";

import { connectDB } from "@/libs/db/mongoose";
import { User } from "@/libs/db/models/UserModel";
import { generateToken, setAuthCookie, clearAuthCookie } from "@/libs/auth";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  try {
    await connectDB();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await User.create({ email, password, name });

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    setAuthCookie(token);
    redirect("/boards");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Signup failed");
  }
}

export async function login(formData: FormData) {
  try {
    await connectDB();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    setAuthCookie(token);
    redirect("/boards");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
}

export async function logout() {
  clearAuthCookie();
  redirect("/login");
}
