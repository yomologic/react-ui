"use client";

import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";

export interface NavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export interface DrawerProps {
    title: string;
    subtitle?: string;
    items?: NavItem[];
    sections?: NavSection[];
    activeItem: string;
    onItemClick: (itemId: string) => void;
    footer?: React.ReactNode;
    position?: "left" | "right";
    homeUrl?: string;
    autoHideOnScroll?: boolean;
}

export function Drawer({
    title,
    subtitle,
    items,
    sections,
    activeItem,
    onItemClick,
    footer,
    position = "right",
    homeUrl,
    autoHideOnScroll = true,
}: DrawerProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isLeft = position === "left";

    const handleItemClick = (itemId: string) => {
        onItemClick(itemId);
        setMobileMenuOpen(false);
    };

    // Use sections if provided, otherwise fall back to items
    const useSections = sections || (items ? [{ title: "", items }] : []);

    // Auto-hide mobile header on scroll
    useEffect(() => {
        if (!autoHideOnScroll) {
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
    }, [lastScrollY, autoHideOnScroll]);

    return (
        <>
            {/* Mobile Header with auto-hide on scroll */}
            <div
                className={`lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 [z-index:var(--z-index-drawer-header)] transition-transform duration-500 ease-in-out ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div
                    className={`flex items-center ${
                        isLeft
                            ? "justify-between"
                            : "justify-between flex-row-reverse"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {homeUrl && (
                            <a
                                href={homeUrl}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Go to home"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </a>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative [z-index:var(--z-index-drawer-button)]"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xs text-gray-500">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Overlays main content without shifting */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden"
                    style={{ zIndex: 9998 }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`
          fixed top-0 bottom-0 w-64 bg-white
          transition-transform duration-500 ease-in-out overflow-y-auto
          ${isLeft ? "left-0 border-r" : "right-0 border-l"} border-gray-200
          lg:translate-x-0 lg:top-0
          ${
              mobileMenuOpen
                  ? "translate-x-0 top-0"
                  : `${isLeft ? "-translate-x-full" : "translate-x-full"} top-0`
          }
        `}
                style={
                    mobileMenuOpen &&
                    typeof window !== "undefined" &&
                    window.innerWidth < 1024
                        ? { zIndex: 9999 }
                        : undefined
                }
            >
                {/* Desktop Header */}
                <div className="hidden lg:block p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>

                {/* Mobile Header with Close Button Inside Drawer */}
                <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xs text-gray-500 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="p-4">
                    {useSections.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            style={{
                                paddingTop:
                                    sectionIndex > 0
                                        ? "var(--drawer-section-padding-y)"
                                        : "0",
                            }}
                        >
                            {section.title && (
                                <h3
                                    className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    style={{
                                        marginBottom:
                                            "var(--drawer-title-margin-bottom)",
                                    }}
                                >
                                    {section.title}
                                </h3>
                            )}
                            <ul
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--drawer-item-spacing)",
                                }}
                            >
                                {section.items.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() =>
                                                handleItemClick(item.id)
                                            }
                                            className={`
                        w-full flex items-center gap-3 rounded-lg font-medium transition-colors
                        ${
                            activeItem === item.id
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                                            style={{
                                                paddingLeft:
                                                    "var(--drawer-item-padding-x)",
                                                paddingRight:
                                                    "var(--drawer-item-padding-x)",
                                                paddingTop:
                                                    "var(--drawer-item-padding-y)",
                                                paddingBottom:
                                                    "var(--drawer-item-padding-y)",
                                                fontSize:
                                                    "var(--drawer-font-size)",
                                                borderRadius:
                                                    "var(--drawer-border-radius)",
                                            }}
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
                    <div className="p-4 border-t border-gray-200 mt-auto">
                        {footer}
                    </div>
                )}
            </aside>
        </>
    );
}
