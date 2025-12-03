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
    headerActions?: React.ReactNode;
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
    headerActions,
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
                className={`lg:hidden fixed top-0 left-0 right-0 px-4 py-3 z-(--z-index-drawer-header) transition-transform duration-500 ease-in-out ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
                style={{
                    background: "var(--color-background)",
                    borderBottom: "1px solid var(--color-border)",
                }}
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
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: "var(--color-foreground)" }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.background =
                                        "var(--color-muted)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.background =
                                        "transparent")
                                }
                                aria-label="Go to home"
                            >
                                <svg
                                    className="w-5 h-5"
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
                            className="p-2 rounded-lg transition-colors relative z-(--z-index-drawer-button)"
                            style={{ color: "var(--color-foreground)" }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.background =
                                    "var(--color-muted)")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.background =
                                    "transparent")
                            }
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                    {headerActions && (
                        <div className="flex items-center">{headerActions}</div>
                    )}
                    <div>
                        <h1
                            className="font-bold"
                            style={{
                                color: "var(--color-foreground)",
                                fontSize: "var(--typography-h5)",
                            }}
                        >
                            {title}
                        </h1>
                        {subtitle && (
                            <p
                                style={{
                                    color: "var(--color-muted-foreground)",
                                    fontSize: "var(--typography-caption)",
                                }}
                            >
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
                    style={{ zIndex: 9998 }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`
          fixed top-0 bottom-0 w-64
          transition-transform duration-500 ease-in-out overflow-y-auto
          ${isLeft ? "left-0" : "right-0"}
          lg:translate-x-0 lg:top-0
          ${
              mobileMenuOpen
                  ? "translate-x-0 top-0"
                  : `${isLeft ? "-translate-x-full" : "translate-x-full"} top-0`
          }
        `}
                style={{
                    background: "var(--color-background)",
                    borderLeft: isLeft
                        ? "none"
                        : "1px solid var(--color-border)",
                    borderRight: isLeft
                        ? "1px solid var(--color-border)"
                        : "none",
                    ...(mobileMenuOpen &&
                    typeof window !== "undefined" &&
                    window.innerWidth < 1024
                        ? { zIndex: 9999 }
                        : {}),
                }}
            >
                {/* Desktop Header */}
                <div
                    className="hidden lg:block px-6 py-5"
                    style={{
                        borderBottom: "1px solid var(--color-border)",
                        background: "var(--color-muted)",
                    }}
                >
                    <h1
                        className="font-bold"
                        style={{
                            color: "var(--color-foreground)",
                            fontSize: "var(--typography-h5)",
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className="mt-0.5"
                            style={{
                                color: "var(--color-muted-foreground)",
                                fontSize: "var(--typography-caption)",
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Mobile Header with Close Button Inside Drawer */}
                <div
                    className="lg:hidden p-4 flex items-center justify-between"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                    <div>
                        <h1
                            className="font-bold"
                            style={{
                                color: "var(--color-foreground)",
                                fontSize: "var(--typography-h5)",
                            }}
                        >
                            {title}
                        </h1>
                        {subtitle && (
                            <p
                                className="mt-1"
                                style={{
                                    color: "var(--color-muted-foreground)",
                                    fontSize: "var(--typography-caption)",
                                }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "var(--color-foreground)" }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-muted)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="px-3 py-4">
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
                                    className="font-semibold uppercase tracking-wide"
                                    style={{
                                        marginBottom:
                                            "var(--drawer-title-margin-bottom)",
                                        color: "var(--color-muted-foreground)",
                                        fontSize: "var(--typography-caption)",
                                        padding: "0 0.75rem",
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
                                            className="w-full flex items-center gap-3 rounded-lg font-medium transition-all duration-200"
                                            onMouseOver={(e) => {
                                                if (activeItem !== item.id) {
                                                    e.currentTarget.style.background =
                                                        "var(--color-muted)";
                                                    e.currentTarget.style.color =
                                                        "var(--color-foreground)";
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (activeItem !== item.id) {
                                                    e.currentTarget.style.background =
                                                        "transparent";
                                                    e.currentTarget.style.color =
                                                        "var(--color-muted-foreground)";
                                                }
                                            }}
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
                                                background:
                                                    activeItem === item.id
                                                        ? "var(--color-primary)"
                                                        : "transparent",
                                                color:
                                                    activeItem === item.id
                                                        ? "var(--color-background)"
                                                        : "var(--color-muted-foreground)",
                                                boxShadow:
                                                    activeItem === item.id
                                                        ? "0 1px 3px rgba(0,0,0,0.1)"
                                                        : "none",
                                            }}
                                        >
                                            {item.icon && (
                                                <span className="shrink-0 opacity-75">
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
                    <div
                        className="p-4 mt-auto"
                        style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                        {footer}
                    </div>
                )}
            </aside>
        </>
    );
}
