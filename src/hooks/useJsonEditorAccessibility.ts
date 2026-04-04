import { useEffect, useRef } from "react";
import type { EditorPanelHandle } from "../components/JsonEditor/EditorPanel";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

/**
 * Hooks to provide standardized keyboard accessibility for pages using JsonEditorLayout.
 * Handles:
 * - Focus on mount
 * - Alt + 1: Focus Input
 * - Alt + 2: Focus Output
 * - Alt + C: Copy Output
 * - Alt + X: Clear Input
 */
export const useJsonEditorAccessibility = () => {
  const leftPanelRef = useRef<EditorPanelHandle>(null);
  const rightPanelRef = useRef<EditorPanelHandle>(null);

  // Focus input on mount
  useEffect(() => {
    // Small delay to ensure editor is ready
    const timer = setTimeout(() => {
      leftPanelRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useKeyboardShortcuts([
    { 
      key: "1", 
      altKey: true, 
      action: () => leftPanelRef.current?.focus(), 
      options: { preventDefault: true } 
    },
    { 
      key: "2", 
      altKey: true, 
      action: () => rightPanelRef.current?.focus(), 
      options: { preventDefault: true } 
    },
    { 
      key: "c", 
      altKey: true, 
      action: () => rightPanelRef.current?.copy(), 
      options: { preventDefault: true } 
    },
    { 
      key: "x", 
      altKey: true, 
      action: () => leftPanelRef.current?.clear(), 
      options: { preventDefault: true } 
    },
  ]);

  return { leftPanelRef, rightPanelRef };
};
