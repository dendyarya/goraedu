"use client";

import { useEffect } from "react";

/**
 * Closes the header's open menus (native <details>) when someone clicks or taps anywhere outside them, presses
 * Escape, or follows a link inside them. The menus still open and work without JavaScript.
 */
export default function HeaderDismiss() {
  useEffect(() => {
    const menus = () => Array.from(document.querySelectorAll<HTMLDetailsElement>("header details[open]"));
    const onPointer = (e: PointerEvent) => {
      for (const d of menus()) if (!d.contains(e.target as Node)) d.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      for (const d of menus()) {
        d.open = false;
        d.querySelector("summary")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("header details a");
      if (link) for (const d of menus()) d.open = false;
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
