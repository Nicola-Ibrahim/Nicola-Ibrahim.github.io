"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group flex items-center justify-center dark:bg-slate-900/50 dark:hover:bg-indigo-600/10"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`w-5 h-5 text-amber-400 absolute transition-all duration-500 ${
            theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`} 
        />
        <Moon 
          className={`w-5 h-5 text-indigo-400 absolute transition-all duration-500 ${
            theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
