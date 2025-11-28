"use client";

import {
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    Divider,
    SectionLayout,
    DrawerNavSection,
} from "@yomologic/react-ui";
import { BookOpen, LayoutDashboard, Settings, Home } from "lucide-react";
import { useState } from "react";

export default function DrawerPage() {
    // State for component props
    const [position, setPosition] = useState<"left" | "right">("right");
    const [showTitle, setShowTitle] = useState(true);
    const [showSubtitle, setShowSubtitle] = useState(true);
    const [showHomeUrl, setShowHomeUrl] = useState(true);

    // Mock navigation sections
    const navSections: DrawerNavSection[] = [
        {
            title: "Main",
            items: [
                {
                    id: "dashboard",
                    label: "Dashboard",
                    icon: <LayoutDashboard className="w-5 h-5" />,
                },
                {
                    id: "analytics",
                    label: "Analytics",
                    icon: <Home className="w-5 h-5" />,
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    id: "profile",
                    label: "Profile",
                    icon: <Settings className="w-5 h-5" />,
                },
            ],
        },
    ];

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (showTitle) props.push('  title="Application Menu"');
        if (showSubtitle) props.push('  subtitle="Navigation"');
        if (position !== "right") props.push(`  position="${position}"`);
        if (showHomeUrl) props.push('  homeUrl="/"');

        props.push("  sections={sections}");
        props.push('  activeItem="dashboard"');
        props.push("  onItemClick={(id) => console.log(id)}");

        return `const sections: DrawerNavSection[] = [
  {
    title: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <Icon /> },
      { id: "analytics", label: "Analytics", icon: <Icon /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "profile", label: "Profile", icon: <Icon /> },
    ],
  },
];

<Drawer
${props.join("\n")}
/>`;
    };

    return (
        <SectionLayout>
            {/* ========================================
          SECTION 1: COMPONENT EXAMPLES
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Drawer
                </h2>
                <div className="space-y-6">
                    {/* Interactive Example */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Interactive Drawer Preview
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Configure the drawer and see a side-by-side
                                preview. The drawer is shown with main content
                                to demonstrate the layout.
                            </p>

                            {/* Two-column layout: component + code */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display FIRST, then Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* 1. Component Display - FIRST */}
                                        <div className="p-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                            <div
                                                className="bg-white rounded-lg border border-gray-200 overflow-hidden flex"
                                                style={{ height: "400px" }}
                                            >
                                                {/* Drawer Panel */}
                                                <div
                                                    className={`w-64 bg-white border-gray-200 flex flex-col shrink-0 ${
                                                        position === "right"
                                                            ? "order-2 border-l"
                                                            : "order-1 border-r"
                                                    }`}
                                                >
                                                    {/* Header */}
                                                    <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-b from-gray-50 to-white">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div>
                                                                {showTitle && (
                                                                    <h2 className="text-lg font-semibold text-gray-900">
                                                                        Application
                                                                        Menu
                                                                    </h2>
                                                                )}
                                                                {showSubtitle && (
                                                                    <p className="text-sm text-gray-600">
                                                                        Navigation
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {showHomeUrl && (
                                                                <button
                                                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                                    title="Home"
                                                                >
                                                                    <Home className="w-5 h-5 text-gray-700" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Navigation */}
                                                    <div className="flex-1 overflow-y-auto px-3 py-4">
                                                        {navSections.map(
                                                            (section, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    style={{
                                                                        paddingTop:
                                                                            idx >
                                                                            0
                                                                                ? "1rem"
                                                                                : "0",
                                                                    }}
                                                                >
                                                                    {section.title && (
                                                                        <h3
                                                                            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                                                                            style={{
                                                                                marginBottom:
                                                                                    "0.5rem",
                                                                            }}
                                                                        >
                                                                            {
                                                                                section.title
                                                                            }
                                                                        </h3>
                                                                    )}
                                                                    <ul
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            flexDirection:
                                                                                "column",
                                                                            gap: "0.25rem",
                                                                        }}
                                                                    >
                                                                        {section.items.map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    <button
                                                                                        className={`w-full flex items-center gap-3 rounded-lg font-medium transition-all duration-200 ${
                                                                                            item.id ===
                                                                                            "dashboard"
                                                                                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                                                                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                                        }`}
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                "1rem",
                                                                                            paddingRight:
                                                                                                "1rem",
                                                                                            paddingTop:
                                                                                                "0.625rem",
                                                                                            paddingBottom:
                                                                                                "0.625rem",
                                                                                            fontSize:
                                                                                                "0.875rem",
                                                                                            borderRadius:
                                                                                                "0.5rem",
                                                                                        }}
                                                                                    >
                                                                                        {item.icon && (
                                                                                            <span className="shrink-0 opacity-75">
                                                                                                {
                                                                                                    item.icon
                                                                                                }
                                                                                            </span>
                                                                                        )}
                                                                                        <span>
                                                                                            {
                                                                                                item.label
                                                                                            }
                                                                                        </span>
                                                                                    </button>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Main Content Area */}
                                                <div
                                                    className={`flex-1 p-6 bg-gray-50 overflow-auto ${
                                                        position === "right"
                                                            ? "order-1"
                                                            : "order-2"
                                                    }`}
                                                >
                                                    <h1 className="text-xl font-bold text-gray-900 mb-3">
                                                        Dashboard Preview
                                                    </h1>
                                                    <p className="text-gray-600 text-sm mb-4">
                                                        The drawer is on the{" "}
                                                        <span className="font-semibold text-blue-600">
                                                            {position}
                                                        </span>{" "}
                                                        side.
                                                    </p>
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                                                            Interactive Preview
                                                        </h3>
                                                        <p className="text-xs text-gray-600">
                                                            This shows the
                                                            Drawer component
                                                            with content side by
                                                            side.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Controls - SECOND */}
                                        <div className="space-y-4">
                                            <RadioGroup
                                                label="Position"
                                                name="position"
                                                value={position}
                                                onChange={(value) =>
                                                    setPosition(
                                                        value as
                                                            | "left"
                                                            | "right"
                                                    )
                                                }
                                                orientation="horizontal"
                                                options={[
                                                    {
                                                        value: "left",
                                                        label: "Left",
                                                    },
                                                    {
                                                        value: "right",
                                                        label: "Right",
                                                    },
                                                ]}
                                            />

                                            <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
                                                <Checkbox
                                                    label="Show title"
                                                    checked={showTitle}
                                                    onChange={setShowTitle}
                                                />
                                                <Checkbox
                                                    label="Show subtitle"
                                                    checked={showSubtitle}
                                                    onChange={setShowSubtitle}
                                                />
                                                <Checkbox
                                                    label="Show home button (mobile)"
                                                    checked={showHomeUrl}
                                                    onChange={setShowHomeUrl}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Code Snippet - THIRD (Right side) */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={generateCode()}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
          SECTION 2: API REFERENCE
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        title
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Main title displayed in the drawer
                                        header
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        subtitle
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Optional subtitle displayed below the
                                        title
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        sections
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        DrawerNavSection[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Array of navigation sections with items
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        position
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        "left" | "right"
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        "left"
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Position of the drawer on the screen
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        activeItem
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        ID of the currently active navigation
                                        item
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onItemClick
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (id: string) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback fired when a navigation item is
                                        clicked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        homeUrl
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Optional URL for the home button (mobile
                                        only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        autoHideOnScroll
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Auto-hide mobile header when scrolling
                                        down, show on scroll up
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </SectionLayout>
    );
}
