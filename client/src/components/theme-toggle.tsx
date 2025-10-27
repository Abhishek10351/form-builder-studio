"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const applyTheme = (newTheme: "light" | "dark") => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        const initialTheme = savedTheme || systemTheme;

        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <Button
            size="icon"
            asChild
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
            } mode`}
        >
            <div
                className={`tdnn relative h-[1rem] -margin-l-20 margin-y-auto scale-40 transition-all cursor-pointer hidde ${
                    theme === "light" ? "day" : ""
                } bg-[var(--toggle-bg)]`}
            >
                <div
                    className={`toggle-btn absolute block rounded-full aspect-square transition-all ${
                        theme === "light" ? "sun" : "moon"
                    }`}
                ></div>
            </div>
        </Button>
    );
}
