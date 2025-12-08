"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export interface NavItem {
    id: string;
    label?: string;
    type?: "link" | "button" | "dropdown" | "divider" | "custom";
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    badge?: string | number;
    disabled?: boolean;
    target?: "_blank" | "_self";
    children?: NavItem[];
    render?: () => React.ReactNode;
}

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
    items: NavItem[];
    variant?: "primary" | "secondary" | "ghost";
    orientation?: "horizontal" | "vertical";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    mobileBreakpoint?: "sm" | "md" | "lg";
    mobileMenuDirection?: "top" | "left" | "right";
    logo?: React.ReactNode;
    actions?: React.ReactNode;
    sticky?: boolean;
    activeId?: string;
    onItemClick?: (item: NavItem) => void;
    /** Remove bottom border for seamless hero integration */
    borderless?: boolean;
    /** Make background transparent */
    transparent?: boolean;
    /** Add backdrop blur effect (glassmorphism) */
    blur?: boolean;
    /** Position of the nav (fixed, sticky, or static) */
    position?: "fixed" | "sticky" | "static";
    /** Auto-hide nav on scroll down, show on scroll up */
    autoHideOnScroll?: boolean;
}

const Nav = React.forwardRef<HTMLElement, NavProps>(
    (
        {
            className,
            items,
            variant = "primary",
            orientation = "horizontal",
            size = "md",
            mobileBreakpoint = "md",
            mobileMenuDirection = "top",
            logo,
            actions,
            sticky = false,
            activeId,
            onItemClick,
            borderless = false,
            transparent = false,
            blur = false,
            position = "static",
            autoHideOnScroll = false,
            ...htmlProps
        },
        ref
    ) => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [openDropdownId, setOpenDropdownId] = useState<string | null>(
            null
        );
        const dropdownRef = useRef<HTMLDivElement>(null);
        const mobileMenuRef = useRef<HTMLDivElement>(null);
        const [navElement, setNavElement] = useState<HTMLElement | null>(null);
        const [isNavVisible, setIsNavVisible] = useState(true);
        const lastScrollYRef = useRef(0);

        // Auto-hide nav on scroll
        useEffect(() => {
            if (!autoHideOnScroll || position === "static") {
                setIsNavVisible(true);
                return;
            }

            const handleScroll = () => {
                const currentScrollY = window.scrollY;

                // Show nav when at top
                if (currentScrollY < 10) {
                    setIsNavVisible(true);
                    lastScrollYRef.current = currentScrollY;
                    return;
                }

                // Hide on scroll down, show on scroll up
                if (currentScrollY > lastScrollYRef.current) {
                    setIsNavVisible(false);
                } else if (currentScrollY < lastScrollYRef.current) {
                    setIsNavVisible(true);
                }

                lastScrollYRef.current = currentScrollY;
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }, [autoHideOnScroll, position]);

        // Close dropdown when clicking outside
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node)
                ) {
                    setOpenDropdownId(null);
                }

                // Close mobile menu when clicking outside (only for top direction dropdown style)
                if (
                    mobileMenuDirection === "top" &&
                    isMobileMenuOpen &&
                    mobileMenuRef.current &&
                    navElement &&
                    !mobileMenuRef.current.contains(event.target as Node) &&
                    !navElement.contains(event.target as Node)
                ) {
                    setIsMobileMenuOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isMobileMenuOpen, mobileMenuDirection]);

        // Close mobile menu on escape
        useEffect(() => {
            function handleEscape(event: KeyboardEvent) {
                if (event.key === "Escape") {
                    setIsMobileMenuOpen(false);
                    setOpenDropdownId(null);
                }
            }

            document.addEventListener("keydown", handleEscape);
            return () => {
                document.removeEventListener("keydown", handleEscape);
            };
        }, []);

        // Close mobile menu when direction changes
        useEffect(() => {
            setIsMobileMenuOpen(false);
        }, [mobileMenuDirection]);

        // Base styles using CSS variables
        const positionClass =
            position === "static"
                ? ""
                : position === "fixed"
                  ? "fixed"
                  : "sticky";
        const transformClass =
            autoHideOnScroll && position !== "static"
                ? `transition-transform duration-500 ease-in-out ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`
                : "";

        // Only add default positioning if not already specified in className
        const hasCustomPositioning = className?.match(/(left-|right-|inset-)/);

        const baseStyles = cn(
            // Position
            positionClass && `${positionClass} [z-index:var(--z-index-nav)]`,
            // Default positioning only if not custom
            positionClass && !hasCustomPositioning && "top-0 left-0 right-0",
            // Transform for auto-hide
            transformClass,
            // Background
            !transparent && !blur && "bg-(--color-background)",
            transparent && "bg-transparent",
            // Blur effect (glassmorphism)
            blur && "backdrop-blur-md bg-transparent"
        );

        // Container styles
        const containerStyles = cn(
            "min-h-14 md:min-h-16",
            "flex items-center justify-between",
            "px-4 md:px-6"
        );

        // Size-based padding styles - Tailwind UI inspired
        const itemPaddingStyles = {
            xs: "px-2 py-1",
            sm: "px-2.5 py-1.5",
            md: "px-3 py-2",
            lg: "px-4 py-2.5",
            xl: "px-5 py-3",
        };

        const fontSizeStyles = {
            xs: "[font-size:var(--nav-font-size-xs)]",
            sm: "[font-size:var(--nav-font-size-sm)]",
            md: "[font-size:var(--nav-font-size-md)]",
            lg: "[font-size:var(--nav-font-size-lg)]",
            xl: "[font-size:var(--nav-font-size-xl)]",
        };

        // Variant styles for items
        const variantItemStyles = {
            primary:
                "rounded-md hover:bg-(--color-primary)/10 hover:text-(--color-primary) transition-colors duration-150",
            secondary:
                "rounded-md hover:bg-(--color-muted) transition-colors duration-150",
            ghost: "rounded-md hover:bg-(--color-primary)/5 transition-colors duration-150",
        };

        const activeItemStyles = {
            primary:
                "bg-(--color-primary) text-white hover:bg-(--color-primary) hover:text-white",
            secondary:
                "bg-(--color-muted) text-(--color-foreground) font-semibold",
            ghost: "text-(--color-primary) font-medium",
        };

        // Breakpoint classes
        const breakpointClasses = {
            sm: "sm:hidden",
            md: "md:hidden",
            lg: "lg:hidden",
        };

        const breakpointShowClasses = {
            sm: "hidden sm:flex",
            md: "hidden md:flex",
            lg: "hidden lg:flex",
        };

        // Handle item click
        const handleItemClick = (item: NavItem) => {
            if (item.disabled) return;

            if (item.type === "dropdown") {
                setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                return;
            }

            if (item.onClick) {
                item.onClick();
            }

            if (onItemClick) {
                onItemClick(item);
            }

            // Close mobile menu after navigation
            setIsMobileMenuOpen(false);
            setOpenDropdownId(null);
        };

        // Render a single nav item
        const renderNavItem = (item: NavItem, isMobile: boolean = false) => {
            if (item.type === "divider") {
                return (
                    <div
                        key={item.id}
                        className={cn(
                            orientation === "horizontal" &&
                                !isMobile &&
                                "h-6 border-l border-(--color-border) mx-2",
                            (orientation === "vertical" || isMobile) &&
                                "w-full h-0 border-t border-(--color-border) my-2"
                        )}
                    />
                );
            }

            if (item.type === "custom" && item.render) {
                return <div key={item.id}>{item.render()}</div>;
            }

            const isActive = activeId === item.id;
            const isDropdownOpen = openDropdownId === item.id;
            const hasChildren = item.children && item.children.length > 0;

            const itemBaseStyles = cn(
                "flex items-center [gap:var(--nav-gap)] font-medium text-(--color-foreground) cursor-pointer select-none",
                itemPaddingStyles[size],
                fontSizeStyles[size],
                variantItemStyles[variant],
                isActive && activeItemStyles[variant],
                orientation === "vertical" && "w-full",
                item.disabled && "opacity-50 cursor-not-allowed"
            );

            const content = (
                <>
                    {item.icon && (
                        <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                    {item.badge && (
                        <span className="ml-auto inline-flex items-center rounded-full bg-(--color-primary) px-2 py-0.5 text-caption font-medium text-white">
                            {item.badge}
                        </span>
                    )}
                    {hasChildren && (
                        <ChevronDown
                            className={cn(
                                "w-4 h-4 transition-transform",
                                isDropdownOpen && "rotate-180"
                            )}
                        />
                    )}
                </>
            );

            // Dropdown item
            if (hasChildren) {
                return (
                    <div key={item.id} className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => handleItemClick(item)}
                            className={itemBaseStyles}
                            disabled={item.disabled}
                        >
                            {content}
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className={cn(
                                    "absolute left-0 mt-[var(--nav-gap)] min-w-[200px] bg-(--color-background) border border-(--color-border) rounded-[var(--nav-border-radius)] shadow-xl [z-index:var(--z-index-dropdown)] animate-in fade-in-0 zoom-in-95 duration-200",
                                    orientation === "vertical" &&
                                        "left-full top-0 ml-2 mt-0"
                                )}
                            >
                                <div className="py-1">
                                    {item.children!.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() =>
                                                handleItemClick(child)
                                            }
                                            disabled={child.disabled}
                                            className={cn(
                                                "w-full flex items-center gap-2 px-4 py-2 [font-size:var(--text-sm)] text-(--color-foreground) hover:bg-(--color-primary)/10 hover:text-(--color-primary) transition-all duration-200 rounded-sm mx-1",
                                                child.disabled &&
                                                    "opacity-50 cursor-not-allowed",
                                                activeId === child.id &&
                                                    "bg-(--color-primary)/10 text-(--color-primary) [font-weight:var(--font-semibold)]"
                                            )}
                                        >
                                            {child.icon && (
                                                <span className="flex-shrink-0">
                                                    {child.icon}
                                                </span>
                                            )}
                                            <span>{child.label}</span>
                                            {child.badge && (
                                                <span className="ml-auto px-2 py-0.5 [font-size:var(--text-xs)] font-semibold bg-(--color-primary) text-white rounded-[var(--radius-full)]">
                                                    {child.badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            // Link item
            if (item.href) {
                return (
                    <a
                        key={item.id}
                        href={item.href}
                        target={item.target}
                        onClick={() => handleItemClick(item)}
                        className={itemBaseStyles}
                    >
                        {content}
                    </a>
                );
            }

            // Button item
            return (
                <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={itemBaseStyles}
                >
                    {content}
                </button>
            );
        };

        // Desktop navigation
        const desktopNav = (
            <div
                className={cn(
                    "items-center [gap:var(--nav-gap)]",
                    breakpointShowClasses[mobileBreakpoint],
                    orientation === "horizontal"
                        ? "flex flex-row"
                        : "flex flex-col"
                )}
            >
                {items.map((item) => renderNavItem(item))}
            </div>
        );

        // Combine external and internal refs
        const setRefs = React.useCallback(
            (node: HTMLElement | null) => {
                setNavElement(node);
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (
                        ref as React.MutableRefObject<HTMLElement | null>
                    ).current = node;
                }
            },
            [ref]
        );

        return (
            <nav
                ref={setRefs}
                className={cn(
                    baseStyles,
                    // Border styles
                    !borderless && "border border-(--color-border)",
                    borderless && "border-0",
                    className
                )}
                {...htmlProps}
            >
                <div className={containerStyles}>
                    {/* Logo */}
                    {logo && <div className="shrink-0">{logo}</div>}

                    {/* Desktop Navigation */}
                    {desktopNav}

                    {/* Actions (right side) */}
                    {actions && (
                        <div className="shrink-0 flex items-center gap-2 ml-auto">
                            {actions}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "p-2 text-(--color-foreground) hover:bg-(--color-muted) rounded-[var(--nav-border-radius)] transition-colors",
                            breakpointClasses[mobileBreakpoint]
                        )}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Content - expands inside container */}
                {mobileMenuDirection === "top" && (
                    <div
                        ref={mobileMenuRef}
                        className={cn(
                            "overflow-hidden transition-all duration-200 ease-in-out border-t",
                            breakpointClasses[mobileBreakpoint],
                            isMobileMenuOpen
                                ? "max-h-96 opacity-100 border-(--color-border)"
                                : "max-h-0 opacity-0 border-transparent"
                        )}
                    >
                        <div className="space-y-1 px-2 py-2">
                            {items.map((item) => renderNavItem(item, true))}
                        </div>
                    </div>
                )}

                {/* Side Drawer Menus - outside container */}
                {mobileMenuDirection !== "top" && (
                    <>
                        {/* Overlay */}
                        {isMobileMenuOpen && (
                            <div
                                className={cn(
                                    "fixed inset-0 [z-index:var(--z-index-nav-mobile-overlay)]",
                                    breakpointClasses[mobileBreakpoint]
                                )}
                                style={{
                                    backgroundColor:
                                        "var(--overlay-background, rgba(0, 0, 0, 0.4))",
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        )}

                        {/* Drawer Panel */}
                        <div
                            ref={mobileMenuRef}
                            className={cn(
                                "fixed top-0 bottom-0 w-64 bg-(--color-background) [z-index:var(--z-index-nav-mobile-menu)] overflow-y-auto transition-transform ease-in-out shadow-lg",
                                breakpointClasses[mobileBreakpoint],
                                mobileMenuDirection === "left" && [
                                    "left-0 border-r border-(--color-border)",
                                    isMobileMenuOpen
                                        ? "translate-x-0"
                                        : "-translate-x-full",
                                ],
                                mobileMenuDirection === "right" && [
                                    "right-0 border-l border-(--color-border)",
                                    isMobileMenuOpen
                                        ? "translate-x-0"
                                        : "translate-x-full",
                                ],
                                !isMobileMenuOpen && "invisible"
                            )}
                            style={{
                                transitionDuration:
                                    "var(--transition-drawer-duration, 500ms)",
                            }}
                        >
                            <div className="flex flex-col space-y-1 px-2 pt-2">
                                {items.map((item) => renderNavItem(item, true))}
                            </div>
                        </div>
                    </>
                )}
            </nav>
        );
    }
);

Nav.displayName = "Nav";

export { Nav };
