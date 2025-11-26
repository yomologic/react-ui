"use client";

import React, { useState, useEffect } from "react";

export interface HeaderProps {
    children: React.ReactNode;
    autoHideOnScroll?: boolean;
    className?: string;
    position?: "fixed" | "sticky" | "static";
}

export function Header({
    children,
    autoHideOnScroll = true,
    className = "",
    position = "fixed",
}: HeaderProps) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (!autoHideOnScroll || position === "static") {
            setIsHeaderVisible(true);
            return;
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header when at top
            if (currentScrollY < 10) {
                setIsHeaderVisible(true);
            }
            // Hide on scroll down, show on scroll up
            else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsHeaderVisible(false);
            } else {
                // Scrolling up
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, autoHideOnScroll, position]);

    const positionClass = position === "static" ? "" : position;
    const transformClass =
        autoHideOnScroll && position !== "static"
            ? `transition-transform duration-500 ease-in-out ${
                  isHeaderVisible ? "translate-y-0" : "-translate-y-full"
              }`
            : "";

    return (
        <header
            className={`${positionClass} top-0 left-0 right-0 ${transformClass} ${className}`}
        >
            {children}
        </header>
    );
}
