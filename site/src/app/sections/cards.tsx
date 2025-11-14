import { useState } from "react";
import {
  Card,
  CardContent,
  RadioGroup,
  Checkbox,
  CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";

export function CardsSection() {
  const [variant, setVariant] = useState<string>("elevated");
  const [padding, setPadding] = useState<string>("md");
  const [hoverable, setHoverable] = useState(false);
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];

    if (variant !== "default") props.push(`variant="${variant}"`);
    if (padding !== "md") props.push(`padding="${padding}"`);
    if (hoverable) props.push("hoverable");

    const propsString = props.join("\n  ");
    return `<Card${
      props.length > 0 ? `\n  ${propsString}` : ""
    }>\n  <CardContent>\n    Your content here\n  </CardContent>\n</Card>`;
  };

  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Cards Live Preview
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
                <div className="max-w-md mx-auto">
                  <Card
                    variant={variant as "default" | "bordered" | "elevated"}
                    padding={padding as "none" | "sm" | "md" | "lg"}
                    hoverable={hoverable}
                  >
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        This is a card component with customizable variants and
                        padding.
                      </p>
                    </CardContent>
                  </Card>
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
                  <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                    <Card variant="elevated" padding="none">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Card Code
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

      {/* Scrollable Content */}
      {/* Interactive Controls */}
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
              onChange={setVariant}
              orientation="horizontal"
              options={[
                { value: "default", label: "Default" },
                { value: "bordered", label: "Bordered" },
                { value: "elevated", label: "Elevated" },
              ]}
            />

            <RadioGroup
              label="Padding"
              name="padding"
              value={padding}
              onChange={setPadding}
              orientation="horizontal"
              options={[
                { value: "none", label: "None" },
                { value: "sm", label: "Small" },
                { value: "md", label: "Medium" },
                { value: "lg", label: "Large" },
              ]}
            />

            <Checkbox
              label="Hoverable"
              checked={hoverable}
              onChange={setHoverable}
            />
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
                    &quot;default&quot; | &quot;bordered&quot; |
                    &quot;elevated&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;default&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Visual style variant of the card
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    padding
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;none&quot; | &quot;sm&quot; | &quot;md&quot; |
                    &quot;lg&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;md&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Internal padding size of the card
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    hoverable
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Adds hover effect with enhanced shadow
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
                    Content to be displayed inside the card
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
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </SectionLayout>
  );
}
