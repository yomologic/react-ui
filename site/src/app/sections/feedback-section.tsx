import { useState } from "react";
import { Card, Spinner, RadioGroup, CodeSnippet } from "@yomologic/react-ui";
import { Alert } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";

export function FeedbackSection() {
  const [componentType, setComponentType] = useState<string>("alert");
  const [alertVariant, setAlertVariant] = useState<string>("info");
  const [spinnerSize, setSpinnerSize] = useState<string>("md");
  const [spinnerColor, setSpinnerColor] = useState<string>("primary");
  const [hasLabel, setHasLabel] = useState<string>("false");
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  // Generate code snippet
  const generateCode = () => {
    if (componentType === "alert") {
      const props: string[] = [];
      if (alertVariant !== "info") props.push(`variant="${alertVariant}"`);
      props.push('title="Alert Title"');

      const propsString = props.join("\n  ");
      return `<Alert\n  ${propsString}\n>\n  Alert message content\n</Alert>`;
    } else {
      const props: string[] = [];
      if (spinnerSize !== "md") props.push(`size="${spinnerSize}"`);
      if (spinnerColor !== "primary") props.push(`color="${spinnerColor}"`);
      if (hasLabel === "true") props.push('label="Loading..."');

      if (props.length === 0) return "<Spinner />";
      const propsString = props.join(" ");
      return `<Spinner ${propsString} />`;
    }
  };

  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Heading */}
            <div className="border-b border-gray-200 pb-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Feedback
              </h1>
              <p className="text-sm text-gray-600">
                Alerts, spinners, and notifications
              </p>
            </div>

            {/* Live Preview */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Live Preview
                </h3>
                <button
                  onClick={() => setShowCodeOverlay(!showCodeOverlay)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  title="View code"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Code
                </button>
              </div>
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="max-w-md mx-auto flex justify-center">
                  {componentType === "alert" ? (
                    <Alert
                      variant={
                        alertVariant as "info" | "success" | "warning" | "error"
                      }
                      title="Alert Title"
                    >
                      This is an alert message with important information.
                    </Alert>
                  ) : (
                    <Spinner
                      size={spinnerSize as "sm" | "md" | "lg" | "xl"}
                      color={spinnerColor as "primary" | "secondary" | "white"}
                      label={hasLabel === "true" ? "Loading..." : undefined}
                    />
                  )}
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
                          {componentType === "alert" ? "Alert" : "Spinner"} Code
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
              label="Component Type"
              name="componentType"
              value={componentType}
              onChange={setComponentType}
              options={[
                { value: "alert", label: "Alert" },
                { value: "spinner", label: "Spinner" },
              ]}
            />

            {componentType === "alert" ? (
              <RadioGroup
                label="Alert Variant"
                name="alertVariant"
                value={alertVariant}
                onChange={setAlertVariant}
                options={[
                  { value: "info", label: "Info" },
                  { value: "success", label: "Success" },
                  { value: "warning", label: "Warning" },
                  { value: "error", label: "Error" },
                ]}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <RadioGroup
                  label="Size"
                  name="spinnerSize"
                  value={spinnerSize}
                  onChange={setSpinnerSize}
                  options={[
                    { value: "sm", label: "Small" },
                    { value: "md", label: "Medium" },
                    { value: "lg", label: "Large" },
                    { value: "xl", label: "X-Large" },
                  ]}
                />

                <RadioGroup
                  label="Color"
                  name="spinnerColor"
                  value={spinnerColor}
                  onChange={setSpinnerColor}
                  options={[
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" },
                    { value: "white", label: "White" },
                  ]}
                />

                <RadioGroup
                  label="Label"
                  name="hasLabel"
                  value={hasLabel}
                  onChange={setHasLabel}
                  options={[
                    { value: "false", label: "No Label" },
                    { value: "true", label: "With Label" },
                  ]}
                />
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* API Documentation */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          API Reference
        </h2>
        <div className="space-y-6">
          {/* Alert API */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Alert</h3>
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
                        &quot;info&quot; | &quot;success&quot; |
                        &quot;warning&quot; | &quot;error&quot;
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        &quot;info&quot;
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Color scheme and icon of the alert
                      </td>
                    </tr>
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
                        Title text of the alert
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
                        undefined
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Alert message content
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                        dismissible
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        boolean
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        false
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Shows a close button to dismiss the alert
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                        onDismiss
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        () =&gt; void
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        undefined
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Callback when alert is dismissed
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Spinner API */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Spinner
            </h3>
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
                        size
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
                        &quot;xl&quot;
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        &quot;md&quot;
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Size of the spinner
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                        color
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        &quot;primary&quot; | &quot;secondary&quot; |
                        &quot;white&quot;
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        &quot;primary&quot;
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Color scheme of the spinner
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                        label
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        string
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        undefined
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Optional text label displayed below spinner
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
