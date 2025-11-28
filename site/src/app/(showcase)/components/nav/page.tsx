"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Nav,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import {
    BookOpen,
    Home,
    Users,
    Settings,
    Bell,
    User,
} from "lucide-react";
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
        {
            id: "settings",
            label: "Settings",
            icon: <Settings className="w-4 h-4" />,
            href: "#settings",
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
        <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
        </div>
    );

    return (
        <SectionLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Nav</h2>
                    <p className="mt-2 text-base text-gray-600">
                        A versatile navigation component with support for icons,
                        badges, dividers, and responsive mobile menus.
                    </p>
                </div>

                {/* Example 1: Nav Variants */}
                <Card variant="bordered">
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display + Controls */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div className="relative p-6 pb-16 md:pb-6 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto overflow-y-visible">
                                <div className="bg-white rounded-lg border border-gray-200">
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
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: "#settings",
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
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display + Controls */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div className="relative p-6 pb-16 md:pb-6 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto overflow-y-visible">
                                <div className="bg-white rounded-lg border border-gray-200">
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
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Left: Display */}
                        <div className="flex-1 min-w-0">
                            <div className="relative p-6 pb-16 md:pb-6 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto overflow-y-visible">
                                <div className="bg-white rounded-lg border border-gray-200">
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
    <div className="flex items-center gap-3">
      <Bell className="w-5 h-5" />
      <User className="w-5 h-5" />
    </div>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        API Reference
                    </h2>

                    <div className="space-y-8">
                        {/* Nav Props */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Nav Props
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Prop
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Type
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Default
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                items
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                NavItem[]
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                required
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Array of navigation items to
                                                display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                variant
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                &quot;primary&quot; |
                                                &quot;secondary&quot; |
                                                &quot;outline&quot; |
                                                &quot;ghost&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                &quot;primary&quot;
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Visual style variant
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                orientation
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                &quot;horizontal&quot; |
                                                &quot;vertical&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                &quot;horizontal&quot;
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Layout direction of navigation
                                                items
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                size
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                &quot;xs&quot; | &quot;sm&quot;
                                                | &quot;md&quot; |
                                                &quot;lg&quot; | &quot;xl&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                &quot;md&quot;
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Size of navigation items
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                activeId
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                -
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                ID of the currently active item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                logo
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                -
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Logo element to display
                                                (typically on the left)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                actions
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                -
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Action elements to display
                                                (typically on the right)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                sticky
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                boolean
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                false
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Whether the nav should stick to
                                                the top on scroll
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                mobileMenuDirection
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                &quot;top&quot; |
                                                &quot;left&quot; |
                                                &quot;right&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                &quot;top&quot;
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Direction for mobile menu
                                                (dropdown or drawer)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                className
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                -
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Additional CSS classes
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* NavItem Interface */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                NavItem Interface
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Property
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Type
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Required
                                            </th>
                                            <th className="text-left p-3 font-semibold text-gray-900">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                id
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                Yes
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Unique identifier for the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                label
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Display text for the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                type
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                &quot;link&quot; |
                                                &quot;divider&quot;
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Type of item (link by default,
                                                or divider)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                href
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                URL to navigate to when clicked
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                onClick
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                function
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Click handler function
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                icon
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                React.ReactNode
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Icon element to display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                badge
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string | number
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Badge content to display
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                disabled
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                boolean
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Whether the item is disabled
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                target
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                string
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Link target attribute (e.g.,
                                                _blank)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                children
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                NavItem[]
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                Nested child items for dropdown
                                                menus
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono text-sm text-blue-600">
                                                render
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-700">
                                                function
                                            </td>
                                            <td className="p-3 font-mono text-sm text-gray-600">
                                                No
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
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
