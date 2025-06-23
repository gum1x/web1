"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Sun, Moon, Monitor, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-foreground">
          BoardHub
        </Link>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <Button variant={theme === "light" ? "default" : "ghost"} size="sm" onClick={() => setTheme("light")} className="h-8 w-8 p-0">
              <Sun className="h-4 w-4" />
            </Button>
            <Button variant={theme === "system" ? "default" : "ghost"} size="sm" onClick={() => setTheme("system")} className="h-8 w-8 p-0">
              <Monitor className="h-4 w-4" />
            </Button>
            <Button variant={theme === "dark" ? "default" : "ghost"} size="sm" onClick={() => setTheme("dark")} className="h-8 w-8 p-0">
              <Moon className="h-4 w-4" />
            </Button>
          </div>

          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
