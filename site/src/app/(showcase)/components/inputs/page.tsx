"use client";

import { useState } from "react";
import {
  Input,
  Card,
  RadioGroup,
  Checkbox,
  CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import {
  Search,
  Mail,
  DollarSign,
  MapPin,
  Lock,
  Settings2,
  Code2,
  BookOpen,
} from "lucide-react";

export default function InputsPage() {
  const [inputType, setInputType] = useState<string>("text");
  const [hasIcon, setHasIcon] = useState<string>("left");
  const [inputState, setInputState] = useState<string>("normal");
  const [hasLabel, setHasLabel] = useState(true);
  const [hasHelper, setHasHelper] = useState(false);
  const [customPlaceholder, setCustomPlaceholder] = useState<string>("");
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  // Helper to get the icon based on type
  const getIcon = () => {
    if (hasIcon === "none") return undefined;

    switch (inputType) {
      case "email":
        return <Mail className="w-5 h-5" />;
      case "search":
        return <Search className="w-5 h-5" />;
      case "number":
        return <DollarSign className="w-5 h-5" />;
      case "password":
        return <Lock className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  // Helper to get placeholder based on type
  const getPlaceholder = () => {
    // Use custom placeholder if provided
    if (customPlaceholder) return customPlaceholder;

    switch (inputType) {
      case "email":
        return "you@example.com";
      case "search":
        return "Search...";
      case "number":
        return "0.00";
      case "password":
        return "••••••••";
      case "tel":
        return "+1 (555) 000-0000";
      case "url":
        return "https://example.com";
      default:
        return "Enter text...";
    }
  };

  // Helper to get label text
  const getLabel = () => {
    if (!hasLabel) return undefined;

    switch (inputType) {
      case "email":
        return "Email Address";
      case "search":
        return "Search";
      case "number":
        return "Amount";
      case "password":
        return "Password";
      case "tel":
        return "Phone Number";
      case "url":
        return "Website URL";
      default:
        return "Text Input";
    }
  };

  // Helper to get icon component name for code
  const getIconName = () => {
    switch (inputType) {
      case "email":
        return "Mail";
      case "search":
        return "Search";
      case "number":
        return "DollarSign";
      case "password":
        return "Lock";
      default:
        return "MapPin";
    }
  };

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];

    if (inputType !== "text") props.push(`type="${inputType}"`);
    if (hasLabel) props.push(`label="${getLabel()}"`);
    props.push(`placeholder="${getPlaceholder()}"`);

    if (hasIcon === "left") {
      props.push(`leftIcon={<${getIconName()} className="w-5 h-5" />}`);
    }
    if (hasIcon === "right") {
      props.push(`rightIcon={<${getIconName()} className="w-5 h-5" />}`);
    }

    if (hasHelper) {
      props.push('helperText="This is a helper text"');
    }

    if (inputState === "error") {
      props.push('error="This field has an error"');
    } else if (inputState === "disabled") {
      props.push("disabled");
    } else if (inputState === "readonly") {
      props.push("readOnly");
    }

    const propsString = props.join("\n  ");
    return `<Input\n  ${propsString}\n/>`;
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
                Inputs Live Preview
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
                  <Input
                    type={inputType}
                    label={getLabel()}
                    placeholder={getPlaceholder()}
                    leftIcon={hasIcon === "left" ? getIcon() : undefined}
                    rightIcon={hasIcon === "right" ? getIcon() : undefined}
                    helperText={hasHelper ? "This is a helper text" : undefined}
                    error={
                      inputState === "error"
                        ? "This field has an error"
                        : undefined
                    }
                    disabled={inputState === "disabled"}
                    readOnly={inputState === "readonly"}
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
                  <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                    <Card variant="elevated" padding="none">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Input Code
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
              label="Input Type"
              name="inputType"
              value={inputType}
              onChange={setInputType}
              orientation="horizontal"
              options={[
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "search", label: "Search" },
                { value: "number", label: "Number" },
                { value: "password", label: "Password" },
                { value: "tel", label: "Tel" },
                { value: "url", label: "URL" },
              ]}
            />

            <RadioGroup
              label="State"
              name="inputState"
              value={inputState}
              onChange={setInputState}
              orientation="horizontal"
              options={[
                { value: "normal", label: "Normal" },
                { value: "error", label: "Error" },
                { value: "disabled", label: "Disabled" },
                { value: "readonly", label: "Read Only" },
              ]}
            />

            <RadioGroup
              label="Icon Position"
              name="hasIcon"
              value={hasIcon}
              onChange={setHasIcon}
              orientation="horizontal"
              options={[
                { value: "none", label: "None" },
                { value: "left", label: "Left Icon" },
                { value: "right", label: "Right Icon" },
              ]}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Checkbox
                label="Show Label"
                checked={hasLabel}
                onChange={setHasLabel}
              />

              <Checkbox
                label="Show Helper Text"
                checked={hasHelper}
                onChange={setHasHelper}
              />
            </div>

            <Input
              label="Custom Placeholder"
              placeholder="Type custom placeholder..."
              value={customPlaceholder}
              onChange={(e) => setCustomPlaceholder(e.target.value)}
              helperText="Leave empty for default"
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
                    type
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;text&quot; | &quot;email&quot; | &quot;password&quot;
                    | &quot;number&quot; | &quot;tel&quot; | &quot;url&quot; |
                    &quot;search&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;text&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    HTML input type attribute
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
                    Label text displayed above the input
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    placeholder
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Placeholder text shown when input is empty
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
                    Icon or element displayed on the left side of input
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
                    Icon or element displayed on the right side of input
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    helperText
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Helper text displayed below the input
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    error
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Error message displayed below the input (shows red styling)
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
                    Disables the input and prevents user interaction
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    readOnly
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Makes the input read-only (visible but not editable)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    boolean
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    false
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Marks the input as required (shows asterisk in label)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    value
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Controlled component value
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    onChange
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    (e: ChangeEvent) =&gt; void
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Callback fired when the input value changes
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
