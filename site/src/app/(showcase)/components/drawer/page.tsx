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
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold theme-text">Drawer</h2>
                    <p className="mt-2 text-base theme-text-muted">
                        A side navigation panel with sections and items, ideal
                        for application layouts.
                    </p>
                </div>

                {/* Interactive Example */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Drawer Preview
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            Configure the drawer and see a side-by-side preview
                            with main content.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Left: Display + Controls */}
                            <div className="flex-1 min-w-0 space-y-4">
                                <div className="p-6 pb-16 md:pb-6 theme-surface rounded-lg border theme-border">
                                    <div
                                        className="theme-bg rounded-lg border theme-border overflow-hidden flex"
                                        style={{ height: "400px" }}
                                    >
                                        {/* Drawer Panel */}
                                        <div
                                            className={`w-64 theme-bg theme-border flex flex-col shrink-0 ${
                                                position === "right"
                                                    ? "order-2 border-l"
                                                    : "order-1 border-r"
                                            }`}
                                        >
                                            {/* Header */}
                                            <div
                                                className="px-6 py-5 border-b theme-border"
                                                style={{
                                                    background:
                                                        "var(--color-surface-elevated)",
                                                }}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>
                                                        {showTitle && (
                                                            <h2 className="text-h3 font-semibold theme-text">
                                                                Application Menu
                                                            </h2>
                                                        )}
                                                        {showSubtitle && (
                                                            <p className="text-small theme-text-muted">
                                                                Navigation
                                                            </p>
                                                        )}
                                                    </div>
                                                    {showHomeUrl && (
                                                        <button
                                                            className="p-2 rounded-lg hover:theme-surface transition-colors"
                                                            title="Home"
                                                        >
                                                            <Home className="w-5 h-5 theme-text-muted" />
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
                                                                    idx > 0
                                                                        ? "1rem"
                                                                        : "0",
                                                            }}
                                                        >
                                                            {section.title && (
                                                                <h3
                                                                    className="px-3 text-xs font-semibold theme-text-muted uppercase tracking-wide"
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
                                                                    (item) => (
                                                                        <li
                                                                            key={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            <button
                                                                                className={`w-full flex items-center gap-3 rounded-lg font-medium transition-all duration-200 ${
                                                                                    item.id ===
                                                                                    "dashboard"
                                                                                        ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] shadow-sm"
                                                                                        : "theme-text-muted hover:theme-surface hover:theme-text"
                                                                                }`}
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
                                            className={`flex-1 p-6 theme-surface overflow-auto ${
                                                position === "right"
                                                    ? "order-1"
                                                    : "order-2"
                                            }`}
                                        >
                                            <h1 className="text-xl font-bold theme-text mb-3">
                                                Dashboard Preview
                                            </h1>
                                            <p className="theme-text-muted text-sm mb-4">
                                                The drawer is on the{" "}
                                                <span className="font-semibold text-[var(--color-primary)]">
                                                    {position}
                                                </span>{" "}
                                                side.
                                            </p>
                                            <div className="theme-bg p-4 rounded-lg border theme-border shadow-sm">
                                                <h3 className="font-semibold theme-text mb-1 text-sm">
                                                    Interactive Preview
                                                </h3>
                                                <p className="text-caption theme-text-muted">
                                                    This shows the Drawer
                                                    component with content side
                                                    by side.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <RadioGroup
                                    label="Position"
                                    name="position"
                                    value={position}
                                    onChange={(value) =>
                                        setPosition(value as "left" | "right")
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

                                <div className="flex flex-col gap-3 pt-2 border-t theme-border">
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

                            {/* Right: Code */}
                            <div className="flex-1 min-w-0">
                                <CodeSnippet
                                    language="tsx"
                                    code={generateCode()}
                                />
                            </div>
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
                                        title
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        required
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Main title displayed in the drawer
                                        header
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        subtitle
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Optional subtitle displayed below the
                                        title
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        sections
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        DrawerNavSection[]
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        required
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Array of navigation sections with items
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        position
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;left&quot; | &quot;right&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;left&quot;
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Position of the drawer on the screen
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        activeItem
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        ID of the currently active navigation
                                        item
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        onItemClick
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        (id: string) =&gt; void
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        required
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Callback fired when a navigation item is
                                        clicked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        homeUrl
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Optional URL for the home button (mobile
                                        only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        autoHideOnScroll
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        true
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Auto-hide mobile header when scrolling
                                        down, show on scroll up
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
