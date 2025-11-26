"use client";

import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout, DrawerNavSection } from "@yomologic/react-ui";
import { useTheme } from "@yomologic/react-ui";
import type { DensityLevel } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function DrawerPage() {
    const { theme, setTheme } = useTheme();

    // State for component props
    const [position, setPosition] = useState<string>("right");
    const [showTitle, setShowTitle] = useState(true);
    const [showSubtitle, setShowSubtitle] = useState(true);
    const [showHomeUrl, setShowHomeUrl] = useState(true);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);
    const [density, setDensity] = useState<DensityLevel>(theme.density);

    const handleDensityChange = (newDensity: string) => {
        const densityLevel = newDensity as DensityLevel;
        setDensity(densityLevel);
        setTheme({ ...theme, density: densityLevel });
    };

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
                { id: "analytics", label: "Analytics" },
            ],
        },
        {
            title: "Settings",
            items: [{ id: "profile", label: "Profile" }],
        },
    ];

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (showTitle) props.push('title="Application Menu"');
        if (showSubtitle) props.push('subtitle="Navigation"');
        if (position !== "right") props.push(`position="${position}"`);
        if (showHomeUrl) props.push('homeUrl="/"');

        props.push("sections={sections}");
        props.push('activeItem="dashboard"');
        props.push("onItemClick={(id) => console.log(id)}");

        const propsString = props.join("\n  ");

        const sectionsCode = `const sections: DrawerNavSection[] = [
  {
    title: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <Icon /> },
      { id: "analytics", label: "Analytics" },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "profile", label: "Profile" },
    ],
  },
];`;

        const densityNote =
            density !== "standard"
                ? `\n// Note: Density is controlled via theme.density = "${density}"\n// Set in ThemeProvider or via setTheme({ ...theme, density: "${density}" })\n\n`
                : "\n";

        return `${sectionsCode}${densityNote}<Drawer\n  ${propsString}\n/>`;
    };

    return (
        <SectionLayout hasStickyPreview>
            {/* ========================================
          SECTION 1: STICKY LIVE PREVIEW
      ======================================== */}
            <section className="sticky top-0 z-15 py-4 bg-gray-50">
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Drawer Live Preview
                            </h2>
                            <button
                                onClick={() =>
                                    setShowCodeOverlay(!showCodeOverlay)
                                }
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                                title="View code"
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                Code
                            </button>
                        </div>

                        {/* Preview Content */}
                        <div className="relative">
                            <div className="p-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden flex"
                                    style={{ height: "350px" }}
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
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    {showTitle && (
                                                        <h2 className="text-lg font-semibold text-gray-900">
                                                            Application Menu
                                                        </h2>
                                                    )}
                                                    {showSubtitle && (
                                                        <p className="text-sm text-gray-500">
                                                            Navigation
                                                        </p>
                                                    )}
                                                </div>
                                                {showHomeUrl && (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                            title="Home button"
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                                            <svg
                                                                className="w-6 h-6 text-gray-700"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M4 6h16M4 12h16M4 18h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex-1 overflow-y-auto">
                                            {navSections.map((section, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        paddingTop:
                                                            idx > 0
                                                                ? theme
                                                                      .components
                                                                      .drawer
                                                                      .sectionPadding[
                                                                      density
                                                                  ].y
                                                                : "0",
                                                    }}
                                                >
                                                    {section.title && (
                                                        <h3
                                                            className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                                            style={{
                                                                marginBottom:
                                                                    theme
                                                                        .components
                                                                        .drawer
                                                                        .titleMarginBottom[
                                                                        density
                                                                    ],
                                                            }}
                                                        >
                                                            {section.title}
                                                        </h3>
                                                    )}
                                                    <nav
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: theme
                                                                .components
                                                                .drawer
                                                                .itemSpacing[
                                                                density
                                                            ],
                                                        }}
                                                    >
                                                        {section.items.map(
                                                            (item) => (
                                                                <button
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    onClick={() => {
                                                                        // Demo click handler
                                                                    }}
                                                                    className={`w-full flex items-center gap-3 rounded-lg font-medium transition-colors ${
                                                                        item.id ===
                                                                        "dashboard"
                                                                            ? "bg-blue-50 text-blue-700"
                                                                            : "text-gray-700 hover:bg-gray-50"
                                                                    }`}
                                                                    style={{
                                                                        paddingLeft:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .itemPadding[
                                                                                density
                                                                            ].x,
                                                                        paddingRight:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .itemPadding[
                                                                                density
                                                                            ].x,
                                                                        paddingTop:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .itemPadding[
                                                                                density
                                                                            ].y,
                                                                        paddingBottom:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .itemPadding[
                                                                                density
                                                                            ].y,
                                                                        fontSize:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .fontSize,
                                                                        borderRadius:
                                                                            theme
                                                                                .components
                                                                                .drawer
                                                                                .borderRadius,
                                                                    }}
                                                                >
                                                                    {item.icon}
                                                                    {item.label}
                                                                </button>
                                                            )
                                                        )}
                                                    </nav>
                                                </div>
                                            ))}
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
                                            side. Use controls below to toggle
                                            options.
                                        </p>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                                                Interactive Preview
                                            </h3>
                                            <p className="text-xs text-gray-600">
                                                This shows the Drawer component
                                                with your content side by side.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Code Overlay */}
                            {showCodeOverlay && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={() =>
                                            setShowCodeOverlay(false)
                                        }
                                    />
                                    {/* Overlay Card */}
                                    <div className="absolute top-12 right-0 z-50 w-full max-w-2xl">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Component Code
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        setShowCodeOverlay(
                                                            false
                                                        )
                                                    }
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                                    title="Close"
                                                >
                                                    <span className="text-2xl leading-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="p-4 max-h-[400px] overflow-y-auto">
                                                <CodeSnippet
                                                    code={generateCode()}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 2: INTERACTIVE CONTROLS
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        {/* Position Selection */}
                        <RadioGroup
                            label="Position"
                            name="position"
                            value={position}
                            onChange={setPosition}
                            orientation="horizontal"
                            options={[
                                { value: "left", label: "Left" },
                                { value: "right", label: "Right" },
                            ]}
                        />

                        {/* Density Selection */}
                        <RadioGroup
                            label="Density"
                            name="density"
                            value={density}
                            onChange={handleDensityChange}
                            orientation="horizontal"
                            options={[
                                { value: "comfortable", label: "Comfortable" },
                                { value: "standard", label: "Standard" },
                                { value: "compact", label: "Compact" },
                            ]}
                        />

                        {/* Additional Options */}
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
                </Card>
            </section>

            {/* ========================================
          SECTION 3: API DOCUMENTATION
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

            {/* ========================================
          SECTION 4: USAGE EXAMPLES
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-4">
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Basic Usage
                        </h3>
                        <CodeSnippet
                            code={`const sections: DrawerNavSection[] = [
  {
    title: "Main",
    items: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
    ],
  },
];

<Drawer
  title="My App"
  sections={sections}
  activeItem="home"
  onItemClick={(id) => console.log(id)}
/>`}
                        />
                    </Card>

                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            With Icons and Position
                        </h3>
                        <CodeSnippet
                            code={`import { Home, Settings } from "lucide-react";

const sections: DrawerNavSection[] = [
  {
    title: "Navigation",
    items: [
      { 
        id: "home", 
        label: "Home",
        icon: <Home className="w-5 h-5" />
      },
      { 
        id: "settings", 
        label: "Settings",
        icon: <Settings className="w-5 h-5" />
      },
    ],
  },
];

<Drawer
  title="My App"
  subtitle="v1.0.0"
  sections={sections}
  position="right"
  activeItem="home"
  onItemClick={handleNavigation}
/>`}
                        />
                    </Card>
                </div>
            </section>
        </SectionLayout>
    );
}
