import { useState } from "react";
import {
  Dropdown,
  Card,
  RadioGroup,
  Checkbox,
  Badge,
  Input,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, BookOpen } from "lucide-react";

export function DropdownSection() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [dropdownState, setDropdownState] = useState<string>("normal");
  const [hasLabel, setHasLabel] = useState(true);
  const [hasHelper, setHasHelper] = useState(false);
  const [contentType, setContentType] = useState<string>("standard");
  const [customPlaceholder, setCustomPlaceholder] = useState<string>("");

  // Sample options
  const standardOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4 (Disabled)", disabled: true },
  ];

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
  ];

  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Dropdowns Live Preview
              </h2>
            </div>

            {/* Preview Content */}
            <div>
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="max-w-md mx-auto">
                  {contentType === "standard" ? (
                    <Dropdown
                      label={hasLabel ? "Select an option" : undefined}
                      placeholder={customPlaceholder || "Choose an option"}
                      options={standardOptions}
                      value={selectedValue}
                      onChange={setSelectedValue}
                      disabled={dropdownState === "disabled"}
                      error={
                        dropdownState === "error"
                          ? "This field has an error"
                          : undefined
                      }
                      helperText={
                        hasHelper ? "This is a helper text" : undefined
                      }
                    />
                  ) : (
                    <Dropdown
                      label={hasLabel ? "Select a country" : undefined}
                      placeholder={customPlaceholder || "Choose a country"}
                      value={selectedValue}
                      onChange={setSelectedValue}
                      disabled={dropdownState === "disabled"}
                      error={
                        dropdownState === "error"
                          ? "This field has an error"
                          : undefined
                      }
                      helperText={
                        hasHelper ? "This is a helper text" : undefined
                      }
                    >
                      {/* Custom content */}
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                          North America
                        </div>
                        {countryOptions.slice(0, 3).map((country) => (
                          <button
                            key={country.value}
                            onClick={() => setSelectedValue(country.value)}
                            className={`
                              w-full px-4 py-2 text-left text-sm flex items-center gap-2
                              transition-colors duration-150
                              ${
                                selectedValue === country.value
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-900 hover:bg-gray-100"
                              }
                            `}
                          >
                            {country.label}
                            {selectedValue === country.value && (
                              <Badge variant="primary" size="sm">
                                Selected
                              </Badge>
                            )}
                          </button>
                        ))}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t mt-1 pt-2">
                          Europe
                        </div>
                        {countryOptions.slice(3, 6).map((country) => (
                          <button
                            key={country.value}
                            onClick={() => setSelectedValue(country.value)}
                            className={`
                              w-full px-4 py-2 text-left text-sm flex items-center gap-2
                              transition-colors duration-150
                              ${
                                selectedValue === country.value
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-900 hover:bg-gray-100"
                              }
                            `}
                          >
                            {country.label}
                            {selectedValue === country.value && (
                              <Badge variant="primary" size="sm">
                                Selected
                              </Badge>
                            )}
                          </button>
                        ))}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t mt-1 pt-2">
                          Asia & Pacific
                        </div>
                        {countryOptions.slice(6).map((country) => (
                          <button
                            key={country.value}
                            onClick={() => setSelectedValue(country.value)}
                            className={`
                              w-full px-4 py-2 text-left text-sm flex items-center gap-2
                              transition-colors duration-150
                              ${
                                selectedValue === country.value
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-900 hover:bg-gray-100"
                              }
                            `}
                          >
                            {country.label}
                            {selectedValue === country.value && (
                              <Badge variant="primary" size="sm">
                                Selected
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </Dropdown>
                  )}
                </div>
              </div>
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
              label="Content Type"
              name="contentType"
              value={contentType}
              onChange={setContentType}
              orientation="horizontal"
              options={[
                { value: "standard", label: "Standard Options" },
                { value: "custom", label: "Custom Content" },
              ]}
            />

            <RadioGroup
              label="State"
              name="dropdownState"
              value={dropdownState}
              onChange={setDropdownState}
              orientation="horizontal"
              options={[
                { value: "normal", label: "Normal" },
                { value: "error", label: "Error" },
                { value: "disabled", label: "Disabled" },
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
                    options
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    DropdownOption[]
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    []
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Array of options: {`{ value, label, disabled? }`}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    value
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                    string | number
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
                    (value) =&gt; void
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Callback when selection changes
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
                    Label text displayed above dropdown
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
                    &quot;Select an option&quot;
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Placeholder text when nothing is selected
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
                    Custom content to render in dropdown (overrides options)
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
                    Disables the dropdown
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
                    Error message displayed below (shows red styling)
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
                    Helper text displayed below dropdown
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
                    Marks the field as required (shows asterisk)
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
