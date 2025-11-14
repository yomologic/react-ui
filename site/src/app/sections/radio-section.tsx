import { useState } from "react";
import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";

export function RadioSection() {
  const [selectedValue, setSelectedValue] = useState("apple");
  const [orientation, setOrientation] = useState<string>("vertical");
  const [hasLabel, setHasLabel] = useState(true);
  const [hasDisabled, setHasDisabled] = useState(false);
  const [groupDisabled, setGroupDisabled] = useState(false);
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);

  const getOptions = () => {
    const baseOptions = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ];

    if (hasDisabled) {
      return [
        ...baseOptions,
        { value: "grape", label: "Grape (Disabled)", disabled: true },
      ];
    }

    return baseOptions;
  };

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = [];

    if (hasLabel) props.push('label="Select a Fruit"');
    props.push('name="fruit"');
    props.push("value={selectedFruit}");
    props.push("onChange={setSelectedFruit}");

    const options = getOptions();
    const optionsCode = options
      .map((opt) => {
        const disabled =
          "disabled" in opt && opt.disabled ? ", disabled: true" : "";
        return `    { value: "${opt.value}", label: "${opt.label}"${disabled} }`;
      })
      .join(",\n");

    if (orientation === "horizontal") {
      props.push('orientation="horizontal"');
    }

    if (groupDisabled) {
      props.push("disabled");
    }

    const propsString = props.join("\n  ");
    return `<RadioGroup\n  ${propsString}\n  options={[\n${optionsCode}\n  ]}\n/>`;
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
                Radio Buttons Live Preview
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
                  <RadioGroup
                    label={hasLabel ? "Select a Fruit" : undefined}
                    name="preview-fruit"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={getOptions()}
                    orientation={orientation as "vertical" | "horizontal"}
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
                          RadioGroup Code
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Checkbox
                label="Show Label"
                checked={hasLabel}
                onChange={setHasLabel}
              />

              <Checkbox
                label="Include Disabled Option"
                checked={hasDisabled}
                onChange={setHasDisabled}
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
                    Label text displayed above the radio group
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
                    Name attribute for the radio group
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    options
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    RadioOption[]
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    required
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Array of options with value, label, and optional disabled
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
                    Currently selected value
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    onChange
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    (value: string) =&gt; void
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
                    Layout orientation of the radio buttons
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
                    Marks the field as required (shows asterisk in label)
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
                    Disables the entire radio group (overrides individual option
                    disabled states)
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
