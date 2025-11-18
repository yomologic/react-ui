import { useState } from "react";
import {
  Search,
  ArrowRight,
  Code2,
  Settings2,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import {
  Button,
  Card,
  RadioGroup,
  Checkbox,
  CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";

export function ButtonsSection() {
  // Interactive playground state
  type VariantType = "primary" | "secondary" | "outline" | "ghost" | "danger";
  type SizeType = "xs" | "sm" | "md" | "lg" | "xl";

  const [variant, setVariant] = useState<VariantType>("primary");
  const [size, setSize] = useState<SizeType>("md");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [hasLeftIcon, setHasLeftIcon] = useState(false);
  const [hasRightIcon, setHasRightIcon] = useState(false);
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);
  const buttonText = "Click Me";

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];

    if (variant !== "primary") props.push(`variant="${variant}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (isDisabled) props.push("disabled");
    if (isLoadingState) props.push("isLoading");
    if (hasLeftIcon) props.push('leftIcon={<Search className="w-4 h-4" />}');
    if (hasRightIcon)
      props.push('rightIcon={<ArrowRight className="w-4 h-4" />}');

    const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
    return `<Button${propsString}>\n  ${buttonText}\n</Button>`;
  };

  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section - sits below mobile header (z-50) and overlay (z-35) */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Buttons Live Preview
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
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <Button
                  variant={variant}
                  size={size}
                  disabled={isDisabled}
                  isLoading={isLoadingState}
                  leftIcon={
                    hasLeftIcon ? <Search className="w-4 h-4" /> : undefined
                  }
                  rightIcon={
                    hasRightIcon ? (
                      <ArrowRight className="w-4 h-4" />
                    ) : undefined
                  }
                >
                  {buttonText}
                </Button>
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
                  <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                    <Card variant="elevated" padding="none">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Button Code
                        </h4>
                        <button
                          onClick={() => setShowCodeOverlay(false)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          title="Close"
                        >
                          <span className="text-2xl leading-none">×</span>
                        </button>
                      </div>
                      <div className="p-4">
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

      {/* Scrollable Interactive Controls */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Interactive Controls
        </h2>
        <Card variant="elevated" padding="lg">
          <div className="space-y-6">
            <RadioGroup
              label="Variant"
              name="variant"
              value={variant}
              onChange={(value) => setVariant(value as VariantType)}
              orientation="horizontal"
              options={[
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
                { value: "danger", label: "Danger" },
              ]}
            />

            <RadioGroup
              label="Size"
              name="size"
              value={size}
              onChange={(value) => setSize(value as SizeType)}
              orientation="horizontal"
              options={[
                { value: "xs", label: "Extra Small" },
                { value: "sm", label: "Small" },
                { value: "md", label: "Medium" },
                { value: "lg", label: "Large" },
                { value: "xl", label: "Extra Large" },
              ]}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Checkbox
                label="Disabled"
                checked={isDisabled}
                onChange={setIsDisabled}
                id="disabled-check"
              />

              <Checkbox
                label="Loading"
                checked={isLoadingState}
                onChange={setIsLoadingState}
                id="loading-check"
              />

              <Checkbox
                label="Left Icon"
                checked={hasLeftIcon}
                onChange={setHasLeftIcon}
                id="left-icon-check"
              />

              <Checkbox
                label="Right Icon"
                checked={hasRightIcon}
                onChange={setHasRightIcon}
                id="right-icon-check"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>
                Adjust the options above to see the preview and code update in
                real-time
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* API Documentation */}
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
                    variant
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;primary&quot; | &quot;secondary&quot; |
                    &quot;outline&quot; | &quot;ghost&quot; | &quot;danger&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;primary&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Visual style of the button
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
                    Size of the button (padding and font size)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    disabled
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Disables the button and prevents interactions
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    isLoading
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Shows loading spinner and disables the button
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    leftIcon
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Icon or element to display on the left side
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    rightIcon
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Icon or element to display on the right side
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    onClick
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    () =&gt; void
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Click event handler
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
                    Additional CSS classes to apply
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    children
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    ReactNode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Button content (text or elements)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Usage Examples
        </h2>
        <div className="space-y-4">
          <Card variant="elevated" padding="lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Basic Usage
            </h3>
            <CodeSnippet code={`<Button>Click Me</Button>`} />
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              With Custom Styling
            </h3>
            <CodeSnippet
              code={`<Button 
  variant="secondary" 
  size="lg" 
  className="w-full"
>
  Full Width Button
</Button>`}
            />
          </Card>

          <Card variant="elevated" padding="lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              With Icons and Loading State
            </h3>
            <CodeSnippet
              code={`const [loading, setLoading] = useState(false);

<Button
  variant="primary"
  leftIcon={<SearchIcon />}
  isLoading={loading}
  onClick={() => handleSearch()}
>
  Search
</Button>`}
            />
          </Card>
        </div>
      </section>
    </SectionLayout>
  );
}
