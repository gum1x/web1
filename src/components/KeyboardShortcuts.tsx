"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { X, Keyboard } from "lucide-react";

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "?" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-40" title="Keyboard shortcuts (? key)">
        <Keyboard className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Keyboard Shortcuts</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Navigation</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open shortcuts</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Close modal</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Cards</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Edit card</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Click</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delete card</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Hover + Trash</kbd>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">?</kbd> anytime to see this help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
