import { useState } from "react";
import {
  Card,
  RadioGroup,
  Checkbox,
  CodeSnippet,
  Nav,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import {
  Settings2,
  Code2,
  BookOpen,
  Home,
  Users,
  Settings,
  Bell,
  HelpCircle,
  User,
} from "lucide-react";

export default function NavSection() {
  // State for component props
  const [variant, setVariant] = useState<string>("primary");
  const [orientation, setOrientation] = useState<string>("horizontal");
  const [size, setSize] = useState<string>("md");
  const [sticky, setSticky] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  // Mock navigation items
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
      badge: showBadges ? "5" : undefined,
    },
    {
      id: "about",
      label: "About",
      icon: <HelpCircle className="w-4 h-4" />,
      href: "#about",
    },
    { id: "divider", type: "divider" as const },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: "#settings",
    },
  ];

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];
    const itemsCode: string[] = [];

    if (variant !== "primary") props.push(`variant="${variant}"`);
    if (orientation !== "horizontal")
      props.push(`orientation="${orientation}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (sticky) props.push("sticky");

    // Generate items array
    itemsCode.push("const items = [");
    itemsCode.push(
      '  { id: "home", label: "Home", icon: <Home />, href: "#home" },'
    );
    if (showBadges) {
      itemsCode.push(
        '  { id: "users", label: "Users", icon: <Users />, href: "#users", badge: "5" },'
      );
    } else {
      itemsCode.push(
        '  { id: "users", label: "Users", icon: <Users />, href: "#users" },'
      );
    }
    itemsCode.push(
      '  { id: "about", label: "About", icon: <HelpCircle />, href: "#about" },'
    );
    itemsCode.push('  { id: "divider", type: "divider" },');
    itemsCode.push(
      '  { id: "settings", label: "Settings", icon: <Settings />, href: "#settings" }'
    );
    itemsCode.push("];");

    const logoCode = showLogo
      ? '  logo={<div className="font-bold">Logo</div>}'
      : "";
    const actionsCode = showActions
      ? `  actions={
    <>
      <Bell className="w-5 h-5" />
      <User className="w-5 h-5" />
    </>
  }`
      : "";

    const propsString = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";
    const additionalProps = [logoCode, actionsCode].filter(Boolean).join("\n");

    return `${itemsCode.join("\n")}

<Nav
  items={items}${propsString}${additionalProps ? `\n${additionalProps}` : ""}
/>`;
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
                Nav Live Preview
              </h2>
              <button
                onClick={() => setShowCodeOverlay(!showCodeOverlay)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                title="View code"
              >
                <Code2 className="w-3.5 h-3.5" />
                Code
              </button>
            </div>

            {/* Preview Content */}
            <div className="relative">
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <Nav
                    items={navItems}
                    variant={
                      variant as "primary" | "secondary" | "outline" | "ghost"
                    }
                    orientation={orientation as "horizontal" | "vertical"}
                    size={size as "sm" | "md" | "lg"}
                    sticky={sticky}
                    logo={
                      showLogo ? (
                        <div className="font-bold text-lg">Logo</div>
                      ) : undefined
                    }
                    actions={
                      showActions ? (
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                          <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                        </div>
                      ) : undefined
                    }
                    activeId="home"
                  />
                </div>
              </div>

              {/* Code Overlay */}
              {showCodeOverlay && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setShowCodeOverlay(false)}
                  />
                  {/* Overlay Card */}
                  <div className="absolute top-12 right-0 z-50 w-full max-w-2xl">
                    <Card variant="elevated" padding="none">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Component Code
                        </h4>
                        <button
                          onClick={() => setShowCodeOverlay(false)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          title="Close"
                        >
                          <span className="text-2xl leading-none">×</span>
                        </button>
                      </div>
                      <div className="p-4 max-h-[400px] overflow-y-auto">
                        <CodeSnippet code={generateCode()} />
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
            {/* Variant Selection */}
            <RadioGroup
              label="Variant"
              name="variant"
              value={variant}
              onChange={setVariant}
              orientation="horizontal"
              options={[
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />

            {/* Orientation Selection */}
            <RadioGroup
              label="Orientation"
              name="orientation"
              value={orientation}
              onChange={setOrientation}
              orientation="horizontal"
              options={[
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical" },
              ]}
            />

            {/* Size Selection */}
            <RadioGroup
              label="Size"
              name="size"
              value={size}
              onChange={setSize}
              orientation="horizontal"
              options={[
                { value: "xs", label: "Extra Small" },
                { value: "sm", label: "Small" },
                { value: "md", label: "Medium" },
                { value: "lg", label: "Large" },
                { value: "xl", label: "Extra Large" },
              ]}
            />

            {/* Additional Options */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Options
              </h3>
              <Checkbox label="Sticky" checked={sticky} onChange={setSticky} />
              <Checkbox
                label="Show Logo"
                checked={showLogo}
                onChange={setShowLogo}
              />
              <Checkbox
                label="Show Actions"
                checked={showActions}
                onChange={setShowActions}
              />
              <Checkbox
                label="Show Badges"
                checked={showBadges}
                onChange={setShowBadges}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* ========================================
          SECTION 3: API REFERENCE
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
                    items
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    NavItem[]
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Array of navigation items to display
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    variant
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;horizontal&quot; | &quot;vertical&quot; |
                    &quot;pills&quot; | &quot;underline&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;horizontal&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Visual style variant of the navigation
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    size
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;md&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Size of navigation items (padding and font-size)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    mobileBreakpoint
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;md&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Breakpoint at which mobile menu is activated
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    logo
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Logo element to display on the left
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    actions
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Action elements to display on the right (e.g., icons,
                    buttons)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    sticky
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Whether navigation sticks to top on scroll
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    activeId
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ID of the currently active navigation item
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    onItemClick
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    (item: NavItem) =&gt; void
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Callback when a navigation item is clicked
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    className
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Additional CSS classes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* NavItem Interface */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            NavItem Interface
          </h3>
          <Card variant="elevated" padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      id
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      string
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Unique identifier for the item
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      label
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      string
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Display text for the item
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      type
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      &quot;link&quot; | &quot;button&quot; |
                      &quot;dropdown&quot; | &quot;divider&quot; |
                      &quot;custom&quot;
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Type of navigation item (default: &quot;button&quot;)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      href
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      string
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      URL for link items
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      onClick
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      () =&gt; void
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Click handler for the item
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      icon
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      ReactNode
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Icon element to display before label
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      badge
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      string | number
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Badge content (e.g., notification count)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      disabled
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      boolean
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Whether the item is disabled
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      target
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      &quot;_blank&quot; | &quot;_self&quot;
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Link target for link items
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      children
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      NavItem[]
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Child items for dropdown menus
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      render
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      () =&gt; ReactNode
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Custom render function for custom type items
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </SectionLayout>
  );
}
