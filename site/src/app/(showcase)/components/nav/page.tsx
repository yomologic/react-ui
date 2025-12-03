"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Nav,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen, Home, Users, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NavPage() {
    // Example 1: Nav Variants
    const [variant1, setVariant1] = useState<string>("primary");

    // Example 2: Nav Orientation
    const [orientation2, setOrientation2] = useState<string>("horizontal");

    // Navigation items
    const navItems = [
        {
            id: "home",
            label: "Home",
            icon: <Home className="w-4 h-4" />,
            href: "#home",
        },
        {
            id: "users",
            label: "Users",
            icon: <Users className="w-4 h-4" />,
            href: "#users",
            badge: "5",
        },
    ];

    const logoElement = (
        <Image
            src="/yomologic-logo-symbol.png"
            alt="Yomologic"
            width={32}
            height={32}
            className="w-8 h-8"
        />
    );

    const actionElements = (
        <User className="w-5 h-5 theme-text-muted cursor-pointer hover:theme-text" />
    );

    return (
        <SectionLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold theme-text">Nav</h2>
                    <p className="mt-2 text-base theme-text-muted">
                        A versatile navigation component with support for icons,
                        badges, dividers, and responsive mobile menus.
                    </p>
                </div>

                {/* Example 1: Nav Variants */}
                <Card variant="bordered">
                    <h3 className="text-h3 font-semibold theme-text mb-4">
                        Nav Variants
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display + Controls */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div className="relative p-6 pb-16 md:pb-6 theme-surface rounded-lg border theme-border overflow-x-auto overflow-y-visible">
                                <div className="theme-bg rounded-lg border theme-border">
                                    <Nav
                                        items={navItems}
                                        variant={
                                            variant1 as
                                                | "primary"
                                                | "secondary"
                                                | "ghost"
                                        }
                                        activeId="home"
                                    />
                                </div>
                            </div>

                            <RadioGroup
                                label="Variant"
                                name="variant1"
                                value={variant1}
                                onChange={setVariant1}
                                orientation="horizontal"
                                options={[
                                    { value: "primary", label: "Primary" },
                                    { value: "secondary", label: "Secondary" },
                                    { value: "ghost", label: "Ghost" },
                                ]}
                            />
                        </div>

                        {/* Right: Code */}
                        <div className="flex-1 min-w-0">
                            <CodeSnippet
                                language="tsx"
                                code={`<Nav
  items={[
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      href: "#home",
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      href: "#users",
      badge: "5",
    },
  ]}
  variant="${variant1}"
  activeId="home"
/>`}
                            />
                        </div>
                    </div>
                </Card>

                {/* Example 2: Nav Orientation */}
                <Card variant="bordered">
                    <h3 className="text-h3 font-semibold theme-text mb-4">
                        Nav Orientation
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display + Controls */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div className="relative p-6 pb-16 md:pb-6 theme-surface rounded-lg border theme-border overflow-x-auto overflow-y-visible">
                                <div className="theme-bg rounded-lg border theme-border">
                                    <Nav
                                        items={navItems}
                                        orientation={
                                            orientation2 as
                                                | "horizontal"
                                                | "vertical"
                                        }
                                        activeId="home"
                                    />
                                </div>
                            </div>

                            <RadioGroup
                                label="Orientation"
                                name="orientation2"
                                value={orientation2}
                                onChange={setOrientation2}
                                orientation="horizontal"
                                options={[
                                    {
                                        value: "horizontal",
                                        label: "Horizontal",
                                    },
                                    { value: "vertical", label: "Vertical" },
                                ]}
                            />
                        </div>

                        {/* Right: Code */}
                        <div className="flex-1 min-w-0">
                            <CodeSnippet
                                language="tsx"
                                code={`<Nav
  items={navItems}
  orientation="${orientation2}"
  activeId="home"
/>`}
                            />
                        </div>
                    </div>
                </Card>

                {/* Example 3: With Logo and Actions */}
                <Card variant="bordered">
                    <h3 className="text-h3 font-semibold theme-text mb-4">
                        With Logo and Actions
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display */}
                        <div className="flex-1 min-w-0">
                            <div className="relative p-6 pb-16 md:pb-6 theme-surface rounded-lg border theme-border overflow-x-auto overflow-y-visible">
                                <div className="theme-bg rounded-lg border theme-border">
                                    <Nav
                                        items={navItems}
                                        logo={logoElement}
                                        actions={actionElements}
                                        activeId="home"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Code */}
                        <div className="flex-1 min-w-0">
                            <CodeSnippet
                                language="tsx"
                                code={`<Nav
  items={navItems}
  logo={
    <Image
      src="/yomologic-logo-symbol.png"
      alt="Yomologic"
      width={32}
      height={32}
      className="w-8 h-8"
    />
  }
  actions={
    <User className="w-5 h-5" />
  }
  activeId="home"
/>`}
                            />
                        </div>
                    </div>
                </Card>

                <Divider className="my-12" />

                {/* API Reference */}
                <div>
                    <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        API Reference
                    </h2>

                    <div className="space-y-8">
                        {/* Nav Props */}
                        <div>
                            <h3 className="text-h3 font-semibold theme-text mb-3">
                                Nav Props
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="theme-surface border-b-2 theme-border">
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Prop
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Type
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Default
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                items
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                NavItem[]
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                required
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Array of navigation items to
                                                display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                variant
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;primary&quot; |
                                                &quot;secondary&quot; |
                                                &quot;outline&quot; |
                                                &quot;ghost&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;primary&quot;
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Visual style variant
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                orientation
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;horizontal&quot; |
                                                &quot;vertical&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;horizontal&quot;
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Layout direction of navigation
                                                items
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                size
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;xs&quot; | &quot;sm&quot;
                                                | &quot;md&quot; |
                                                &quot;lg&quot; | &quot;xl&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;md&quot;
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Size of navigation items
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                activeId
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                -
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                ID of the currently active item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                logo
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                -
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Logo element to display
                                                (typically on the left)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                actions
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                -
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Action elements to display
                                                (typically on the right)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                sticky
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                boolean
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                false
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Whether the nav should stick to
                                                the top on scroll
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                mobileMenuDirection
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;top&quot; |
                                                &quot;left&quot; |
                                                &quot;right&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;top&quot;
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Direction for mobile menu
                                                (dropdown or drawer)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                className
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                -
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Additional CSS classes
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* NavItem Interface */}
                        <div>
                            <h3 className="text-h3 font-semibold theme-text mb-3">
                                NavItem Interface
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="theme-surface border-b-2 theme-border">
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Property
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Type
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Required
                                            </th>
                                            <th className="text-left p-3 font-semibold theme-text">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                id
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                Yes
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Unique identifier for the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                label
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Display text for the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                type
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                &quot;link&quot; |
                                                &quot;divider&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Type of item (link by default,
                                                or divider)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                href
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                URL to navigate to when clicked
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                onClick
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                function
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Click handler function
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                icon
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Icon element to display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                badge
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string | number
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Badge content to display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                disabled
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                boolean
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Whether the item is disabled
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                target
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Link target attribute (e.g.,
                                                _blank)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                children
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                NavItem[]
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Nested child items for dropdown
                                                menus
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                                render
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                function
                                            </td>
                                            <td className="p-3 font-mono text-sm theme-text-muted">
                                                No
                                            </td>
                                            <td className="p-3 text-sm theme-text-muted">
                                                Custom render function for the
                                                item
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
