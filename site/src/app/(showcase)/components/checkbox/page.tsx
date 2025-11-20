"use client";

import { useState } from "react";
import {
  Card,
  CheckboxGroup,
  RadioGroup,
  Checkbox,
  CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";

export default function CheckboxPage() {
  const [selectedValues, setSelectedValues] = useState<string[]>(["email"]);
  const [orientation, setOrientation] = useState<string>("vertical");
  const [showLabel, setShowLabel] = useState(true);
  const [hasDisabledOption, setHasDisabledOption] = useState(false);
  const [groupDisabled, setGroupDisabled] = useState(false);
  const [size, setSize] = useState<string>("md");
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];

    if (showLabel) props.push('label="Notification Preferences"');
    props.push('name="notifications"');

    // Generate options array
    const options = [
      '{ value: "email", label: "Email notifications" }',
      '{ value: "sms", label: "SMS notifications" }',
      hasDisabledOption
        ? '{ value: "push", label: "Push notifications", disabled: true }'
        : '{ value: "push", label: "Push notifications" }',
    ];
    props.push(`options={[\n    ${options.join(",\n    ")}\n  ]}`);

    props.push("value={selectedValues}");
    props.push("onChange={setSelectedValues}");
    if (orientation !== "vertical") props.push(`orientation="${orientation}"`);
    if (size !== "md") props.push(`size="${size}"`);
    if (groupDisabled) props.push("disabled");

    const propsString = props.join("\n  ");
    return `<CheckboxGroup\n  ${propsString}\n/>`;
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
                Checkbox Group Live Preview
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
                  <CheckboxGroup
                    label={showLabel ? "Notification Preferences" : undefined}
                    name="notifications"
                    options={[
                      { value: "email", label: "Email notifications" },
                      { value: "sms", label: "SMS notifications" },
                      {
                        value: "push",
                        label: "Push notifications",
                        disabled: hasDisabledOption,
                      },
                    ]}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    orientation={orientation as "vertical" | "horizontal"}
                    size={size as "sm" | "md" | "lg"}
                    disabled={groupDisabled}
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
                          Checkbox Code
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
              label="Orientation"
              name="orientation"
              value={orientation}
              onChange={setOrientation}
              orientation="horizontal"
              options={[
                { value: "vertical", label: "Vertical" },
                { value: "horizontal", label: "Horizontal" },
              ]}
            />

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

            <div className="flex flex-col sm:flex-row gap-4">
              <Checkbox
                label="Show Label"
                checked={showLabel}
                onChange={setShowLabel}
              />

              <Checkbox
                label="Disable Third Option"
                checked={hasDisabledOption}
                onChange={setHasDisabledOption}
              />

              <Checkbox
                label="Disable Entire Group"
                checked={groupDisabled}
                onChange={setGroupDisabled}
              />
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
                    label
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Group label displayed above the checkboxes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    name
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Name attribute for the checkbox group
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    options
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    CheckboxOption[]
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Array of checkbox options (value, label, disabled)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    value
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string[]
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    []
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Array of selected checkbox values
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    onChange
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    (value: string[]) =&gt; void
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Callback fired when selection changes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    orientation
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    &quot;vertical&quot; | &quot;horizontal&quot;
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    &quot;vertical&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Layout direction of the checkbox group
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
                    Shows asterisk (*) next to label if true
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
                    Disables the entire checkbox group (overrides individual
                    option disabled states)
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
