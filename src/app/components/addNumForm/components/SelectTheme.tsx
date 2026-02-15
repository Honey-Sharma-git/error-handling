"use client";

import { DEFAULT_THEME } from "@/constants/config";
import { THEMES } from "@/constants/dropdown-options";
import { useCallback, useEffect, useState } from "react";

type Theme = (typeof THEMES)[number]["value"];

export function SelectTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  /**
   * **isTheme()**
   * - Check if the value is one of the defined theme from THEME array
   */
  const isTheme = useCallback((value: string): value is Theme => {
    return THEMES.some((theme) => theme.value === value);
  }, []);

  /**
   * **applyTheme()**
   * - Set the data-theme attribute to <html/>
   */
  const applyTheme = useCallback((theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  /**
   * **handleThemeChange()**
   * - Applies theme to <html/>
   * - Set theme in dropdown
   * - Save theme in local storage
   */
  const handleThemeChange = useCallback((theme: Theme) => {
    setTheme(theme);
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && isTheme(savedTheme)) {
      applyTheme(savedTheme);
      setTheme(savedTheme);
    } else {
      applyTheme(DEFAULT_THEME);
      setTheme(DEFAULT_THEME);
    }
  }, []);

  return (
    <article className="flex flex-row flex-wrap md:justify-start justify-center gap-4 items-center p-2">
      <label htmlFor="select-theme" className="text-text-color hidden md:block">
        Select color theme:
      </label>

      <select
        className="text-text-color bg-card-background border p-1 rounded border-input-border"
        id="select-theme"
        value={theme}
        onChange={(e) => {
          const value = e.target.value;
          if (isTheme(value)) handleThemeChange(value);
        }}
      >
        {THEMES.map((theme, idx) => {
          return (
            <option key={`${theme.label}-${idx}`} value={theme.value}>
              {theme.label}
            </option>
          );
        })}
      </select>
    </article>
  );
}
