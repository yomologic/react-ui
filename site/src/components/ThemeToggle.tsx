"use client";

import { Button, useTheme } from "@yomologic/react-ui";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { currentTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = currentTheme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-2"
            suppressHydrationWarning
        >
            {mounted ? (
                isDark ? (
                    <>
                        <Sun className="w-4 h-4" />
                        <span className="hidden sm:inline">Light</span>
                    </>
                ) : (
                    <>
                        <Moon className="w-4 h-4" />
                        <span className="hidden sm:inline">Dark</span>
                    </>
                )
            ) : (
                <>
                    <Sun className="w-4 h-4" />
                    <span className="hidden sm:inline">Light</span>
                </>
            )}
        </Button>
    );
}
