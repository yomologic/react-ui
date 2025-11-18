"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

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
  variant?: "primary" | "secondary" | "outline" | "ghost";
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  mobileBreakpoint?: "sm" | "md" | "lg";
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  activeId?: string;
  onItemClick?: (item: NavItem) => void;
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
      logo,
      actions,
      sticky = false,
      activeId,
      onItemClick,
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpenDropdownId(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

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

    // Base styles using CSS variables
    const baseStyles = cn(
      "bg-[var(--color-background)] border-b border-[var(--color-border)]",
      sticky && "sticky top-0 z-50"
    );

    // Container styles
    const containerStyles = cn(
      "[min-height:var(--nav-height)]",
      "flex items-center justify-between",
      "px-[var(--spacing-lg)]"
    );

    // Size-based padding styles using CSS variables
    const itemPaddingStyles = {
      xs: "[padding-left:var(--nav-item-padding-xs-x)] [padding-right:var(--nav-item-padding-xs-x)] [padding-top:var(--nav-item-padding-xs-y)] [padding-bottom:var(--nav-item-padding-xs-y)]",
      sm: "[padding-left:var(--nav-item-padding-sm-x)] [padding-right:var(--nav-item-padding-sm-x)] [padding-top:var(--nav-item-padding-sm-y)] [padding-bottom:var(--nav-item-padding-sm-y)]",
      md: "[padding-left:var(--nav-item-padding-md-x)] [padding-right:var(--nav-item-padding-md-x)] [padding-top:var(--nav-item-padding-md-y)] [padding-bottom:var(--nav-item-padding-md-y)]",
      lg: "[padding-left:var(--nav-item-padding-lg-x)] [padding-right:var(--nav-item-padding-lg-x)] [padding-top:var(--nav-item-padding-lg-y)] [padding-bottom:var(--nav-item-padding-lg-y)]",
      xl: "[padding-left:var(--nav-item-padding-xl-x)] [padding-right:var(--nav-item-padding-xl-x)] [padding-top:var(--nav-item-padding-xl-y)] [padding-bottom:var(--nav-item-padding-xl-y)]",
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
        "rounded-[var(--nav-border-radius)] hover:bg-blue-50 transition-colors",
      secondary:
        "rounded-[var(--nav-border-radius)] hover:bg-[var(--color-muted)] transition-colors",
      outline: cn(
        "rounded-[var(--nav-border-radius)] border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors"
      ),
      ghost:
        "rounded-[var(--nav-border-radius)] hover:bg-[var(--color-muted)]/50 transition-colors",
    };

    const activeItemStyles = {
      primary: "bg-blue-100 text-blue-700",
      secondary: "bg-[var(--color-muted)] [font-weight:var(--font-semibold)]",
      outline: "border-blue-600 bg-blue-50 text-blue-700",
      ghost: "bg-[var(--color-muted)]",
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
                "h-6 border-l border-[var(--color-border)] mx-2",
              (orientation === "vertical" || isMobile) &&
                "w-full h-0 border-t border-[var(--color-border)] my-2"
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
        "flex items-center [gap:var(--nav-gap)] font-medium text-[var(--color-foreground)] cursor-pointer select-none",
        itemPaddingStyles[size],
        fontSizeStyles[size],
        variantItemStyles[variant],
        isActive && activeItemStyles[variant],
        orientation === "vertical" && "w-full",
        item.disabled && "opacity-50 cursor-not-allowed"
      );

      const content = (
        <>
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto px-2 py-0.5 [font-size:var(--text-xs)] font-semibold bg-red-500 text-white rounded-[var(--radius-full)]">
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
                  "absolute left-0 mt-[var(--nav-gap)] min-w-[200px] bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--nav-border-radius)] shadow-lg z-50",
                  orientation === "vertical" && "left-full top-0 ml-2 mt-0"
                )}
              >
                <div className="py-1">
                  {item.children!.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleItemClick(child)}
                      disabled={child.disabled}
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-2 [font-size:var(--text-sm)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors",
                        child.disabled && "opacity-50 cursor-not-allowed",
                        activeId === child.id &&
                          "bg-[var(--color-muted)] [font-weight:var(--font-semibold)]"
                      )}
                    >
                      {child.icon && (
                        <span className="flex-shrink-0">{child.icon}</span>
                      )}
                      <span>{child.label}</span>
                      {child.badge && (
                        <span className="ml-auto px-2 py-0.5 [font-size:var(--text-xs)] font-semibold bg-red-500 text-white rounded-[var(--radius-full)]">
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
          orientation === "horizontal" ? "flex flex-row" : "flex flex-col"
        )}
      >
        {items.map((item) => renderNavItem(item))}
      </div>
    );

    // Mobile navigation
    const mobileNav = (
      <>
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "p-2 text-[var(--color-foreground)] hover:bg-[var(--color-muted)] rounded-[var(--nav-border-radius)] transition-colors",
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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-[var(--nav-height)] left-0 right-0 bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-lg z-50 max-h-[calc(100vh-var(--nav-height))] overflow-y-auto">
              <div className="flex flex-col py-2">
                {items.map((item) => renderNavItem(item, true))}
              </div>
            </div>
          </>
        )}
      </>
    );

    return (
      <nav ref={ref} className={cn(baseStyles, className)} {...props}>
        <div className={containerStyles}>
          {/* Logo */}
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {/* Desktop Navigation */}
          {desktopNav}

          {/* Actions (right side) */}
          {actions && (
            <div className="flex-shrink-0 flex items-center gap-2">
              {actions}
            </div>
          )}

          {/* Mobile Menu Button */}
          {mobileNav}
        </div>
      </nav>
    );
  }
);

Nav.displayName = "Nav";

export { Nav };
