"use client";

import { Menu, X } from "lucide-react";
import React, { useState } from "react";

export interface NavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export interface SidebarNavProps {
    title: string;
    subtitle?: string;
    items?: NavItem[];
    sections?: NavSection[];
    activeItem: string;
    onItemClick: (itemId: string) => void;
    footer?: React.ReactNode;
    position?: "left" | "right";
}

export function SidebarNav({
    title,
    subtitle,
    items,
    sections,
    activeItem,
    onItemClick,
    footer,
    position = "right",
}: SidebarNavProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLeft = position === "left";

    const handleItemClick = (itemId: string) => {
        onItemClick(itemId);
        setMobileMenuOpen(false);
    };

    // Use sections if provided, otherwise fall back to items
    const useSections = sections || (items ? [{ title: "", items }] : []);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 [z-index:var(--z-index-nav)] bg-(--color-background) border-b border-(--color-border) px-4 py-3">
                <div
                    className={`flex items-center ${
                        isLeft
                            ? "justify-between"
                            : "justify-between flex-row-reverse"
                    }`}
                >
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-(--color-muted) transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-(--color-muted-foreground)" />
                        ) : (
                            <Menu className="w-6 h-6 text-(--color-muted-foreground)" />
                        )}
                    </button>
                    <div>
                        <h1 className="text-h4 font-bold text-(--color-foreground)">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-caption text-(--color-muted-foreground)">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Overlays main content without shifting */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden"
                    style={{ zIndex: 35 }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`
          fixed top-0 h-screen w-64 bg-(--color-background) [z-index:var(--z-index-drawer)]
          transition-transform duration-300 ease-in-out overflow-y-auto
          ${isLeft ? "left-0 border-r" : "right-0 border-l"} border-(--color-border)
          lg:translate-x-0
          ${
              mobileMenuOpen
                  ? "translate-x-0"
                  : `${
                        isLeft ? "-translate-x-full" : "translate-x-full"
                    } lg:translate-x-0`
          }
        `}
            >
                {/* Desktop Header */}
                <div className="hidden lg:block p-6 border-b border-(--color-border)">
                    <h1 className="text-h3 font-bold text-(--color-foreground)">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-caption text-(--color-muted-foreground) mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Mobile Header Spacer */}
                <div className="lg:hidden h-[57px]" aria-hidden="true" />

                {/* Navigation Items */}
                <nav className="p-4">
                    {useSections.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            className={sectionIndex > 0 ? "mt-6" : ""}
                        >
                            {section.title && (
                                <h3 className="px-4 mb-2 text-caption font-semibold text-(--color-muted-foreground) uppercase tracking-wider">
                                    {section.title}
                                </h3>
                            )}
                            <ul className="space-y-1">
                                {section.items.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() =>
                                                handleItemClick(item.id)
                                            }
                                            className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-small font-medium transition-colors
                        ${
                            activeItem === item.id
                                ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-primary)"
                                : "text-(--color-muted-foreground) hover:bg-(--color-muted)"
                        }
                      `}
                                        >
                                            {item.icon && (
                                                <span className="shrink-0">
                                                    {item.icon}
                                                </span>
                                            )}
                                            <span>{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                {footer && (
                    <div className="p-4 border-t border-(--color-border) mt-auto">
                        {footer}
                    </div>
                )}
            </aside>
        </>
    );
}
