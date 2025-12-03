"use client";

import { Button } from "@yomologic/react-ui";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
    const { currentTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = currentTheme === "yomologic-dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "default" : "yomologic-dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    // Return nothing until mounted to avoid hydration mismatch
    if (!mounted) {
        return <div className="w-[88px] h-9" />;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-2"
        >
            {isDark ? (
                <>
                    <Sun className="w-4 h-4" />
                    <span className="hidden sm:inline">Light</span>
                </>
            ) : (
                <>
                    <Moon className="w-4 h-4" />
                    <span className="hidden sm:inline">Dark</span>
                </>
            )}
        </Button>
    );
}
