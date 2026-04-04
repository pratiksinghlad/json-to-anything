import { useEffect, useCallback, useRef } from "react";

export interface ShortcutOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  /** If true, the shortcut won't trigger if the user is typing in an input/textarea.
   *  Default: false for 'Alt' shortcuts, true for others.
   */
  ignoreInput?: boolean;
}

export interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: (event: KeyboardEvent) => void;
  options?: ShortcutOptions;
}

/**
 * Hook to manage global or local keyboard shortcuts.
 */
export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[], enabled = true) => {
  const shortcutsRef = useRef<ShortcutConfig[]>(shortcuts);

  // Sync ref to avoid stale closures in the event listener
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const isInputActive =
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement ||
      document.activeElement?.getAttribute("contenteditable") === "true" ||
      document.activeElement?.classList.contains("editor-textarea");

    for (const shortcut of shortcutsRef.current) {
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!event.ctrlKey === !!shortcut.ctrlKey &&
        !!event.altKey === !!shortcut.altKey &&
        !!event.shiftKey === !!shortcut.shiftKey &&
        !!event.metaKey === !!shortcut.metaKey
      ) {
        // Handle input ignoring
        const shouldIgnoreInput = 
          shortcut.options?.ignoreInput ?? 
          (shortcut.altKey ? false : true); // Default: don't ignore if Alt is pressed

        if (isInputActive && shouldIgnoreInput) {
          continue;
        }

        if (shortcut.options?.preventDefault) {
          event.preventDefault();
        }
        if (shortcut.options?.stopPropagation) {
          event.stopPropagation();
        }

        shortcut.action(event);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
};
