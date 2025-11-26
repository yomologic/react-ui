"use client";

import {
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    Slider,
    SectionLayout,
    Input,
} from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";
import { useState } from "react";

export default function SliderPage() {
    const [value, setValue] = useState(5);
    const [rangeValue, setRangeValue] = useState([2, 8]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);
    const [step, setStep] = useState(1);
    const [showMarks, setShowMarks] = useState(false);
    const [useCustomMarks, setUseCustomMarks] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
        "horizontal"
    );
    const [size, setSize] = useState<"small" | "medium">("medium");
    const [color, setColor] = useState<"primary" | "secondary">("primary");
    const [valueLabelDisplay, setValueLabelDisplay] = useState<
        "auto" | "on" | "off"
    >("auto");
    const [track, setTrack] = useState<"normal" | "inverted" | false>("normal");
    const [isRange, setIsRange] = useState(false);
    const [showMarkLabelsOnHover, setShowMarkLabelsOnHover] = useState(false);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);
    const [maxError, setMaxError] = useState("");

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (isRange) {
            props.push(`value={[${rangeValue[0]}, ${rangeValue[1]}]}`);
            props.push(`onChange={(val) => setRangeValue(val as number[])}`);
        } else {
            props.push(`value={${value}}`);
            props.push(`onChange={(val) => setValue(val as number)}`);
        }

        if (min !== 0) props.push(`min={${min}}`);
        if (max !== 100) props.push(`max={${max}}`);
        if (step !== 1) props.push(`step={${step}}`);
        if (showMarks) {
            if (useCustomMarks) {
                props.push(`marks={[
    { value: ${min}, label: "${min}" },
    { value: ${Math.round((min + max) / 2)}, label: "${Math.round((min + max) / 2)}" },
    { value: ${max}, label: "${max}" },
  ]}`);
            } else {
                props.push("marks");
            }
        }
        if (showMarkLabelsOnHover) props.push("showMarkLabelsOnHover");
        if (disabled) props.push("disabled");
        if (orientation !== "horizontal")
            props.push(`orientation="${orientation}"`);
        if (size !== "medium") props.push(`size="${size}"`);
        if (color !== "primary") props.push(`color="${color}"`);
        if (valueLabelDisplay !== "auto")
            props.push(`valueLabelDisplay="${valueLabelDisplay}"`);
        if (track !== "normal") {
            props.push(track === false ? "track={false}" : `track="${track}"`);
        }

        const propsString = props.join("\n  ");
        return `<Slider\n  ${propsString}\n/>`;
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
                                Slider Live Preview
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
                            <div className="p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div
                                    className={`${orientation === "vertical" ? "flex justify-center" : ""} max-w-xl mx-auto`}
                                >
                                    {isRange ? (
                                        <Slider
                                            value={rangeValue}
                                            onChange={(val) =>
                                                setRangeValue(val as number[])
                                            }
                                            min={min}
                                            max={max}
                                            step={step}
                                            marks={
                                                showMarks
                                                    ? useCustomMarks
                                                        ? [
                                                              {
                                                                  value: min,
                                                                  label: String(
                                                                      min
                                                                  ),
                                                              },
                                                              {
                                                                  value: Math.round(
                                                                      (min +
                                                                          max) /
                                                                          2
                                                                  ),
                                                                  label: String(
                                                                      Math.round(
                                                                          (min +
                                                                              max) /
                                                                              2
                                                                      )
                                                                  ),
                                                              },
                                                              {
                                                                  value: max,
                                                                  label: String(
                                                                      max
                                                                  ),
                                                              },
                                                          ]
                                                        : true
                                                    : false
                                            }
                                            showMarkLabelsOnHover={
                                                showMarkLabelsOnHover
                                            }
                                            disabled={disabled}
                                            orientation={orientation}
                                            size={size}
                                            color={color}
                                            valueLabelDisplay={
                                                valueLabelDisplay
                                            }
                                            track={track}
                                        />
                                    ) : (
                                        <Slider
                                            value={value}
                                            onChange={(val) =>
                                                setValue(val as number)
                                            }
                                            min={min}
                                            max={max}
                                            step={step}
                                            marks={
                                                showMarks
                                                    ? useCustomMarks
                                                        ? [
                                                              {
                                                                  value: min,
                                                                  label: String(
                                                                      min
                                                                  ),
                                                              },
                                                              {
                                                                  value: Math.round(
                                                                      (min +
                                                                          max) /
                                                                          2
                                                                  ),
                                                                  label: String(
                                                                      Math.round(
                                                                          (min +
                                                                              max) /
                                                                              2
                                                                      )
                                                                  ),
                                                              },
                                                              {
                                                                  value: max,
                                                                  label: String(
                                                                      max
                                                                  ),
                                                              },
                                                          ]
                                                        : true
                                                    : false
                                            }
                                            showMarkLabelsOnHover={
                                                showMarkLabelsOnHover
                                            }
                                            disabled={disabled}
                                            orientation={orientation}
                                            size={size}
                                            color={color}
                                            valueLabelDisplay={
                                                valueLabelDisplay
                                            }
                                            track={track}
                                        />
                                    )}
                                </div>
                                <div className="mt-6 text-center text-sm text-gray-600">
                                    {isRange
                                        ? `Range: ${rangeValue[0]} - ${rangeValue[1]}`
                                        : `Value: ${value}`}
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
                                    <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Slider Code
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
                                            <div className="p-4">
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
                        {/* Range Mode */}
                        <Checkbox
                            label="Range Mode"
                            checked={isRange}
                            onChange={setIsRange}
                        />

                        {/* Numeric Inputs Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {/* Min Value */}
                            <Input
                                label="Min Value"
                                type="number"
                                value={min}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val < max) setMin(val);
                                }}
                            />

                            {/* Max Value */}
                            <Input
                                label="Max Value"
                                type="number"
                                value={max}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val <= min) {
                                        setMaxError("Must be greater than Min");
                                    } else if (val > 1000) {
                                        setMaxError("Maximum value is 1000");
                                    } else {
                                        setMaxError("");
                                        setMax(val);
                                    }
                                }}
                                max={1000}
                                error={maxError}
                            />

                            {/* Step */}
                            <Input
                                label="Step"
                                type="number"
                                value={step}
                                onChange={(e) =>
                                    setStep(Number(e.target.value) || 1)
                                }
                                min={0.1}
                                step={0.1}
                            />
                        </div>

                        {/* Orientation Selection */}
                        <RadioGroup
                            label="Orientation"
                            name="orientation"
                            value={orientation}
                            onChange={(val) =>
                                setOrientation(val as "horizontal" | "vertical")
                            }
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
                            onChange={(val) =>
                                setSize(val as "small" | "medium")
                            }
                            orientation="horizontal"
                            options={[
                                { value: "small", label: "Small" },
                                { value: "medium", label: "Medium" },
                            ]}
                        />

                        {/* Color Selection */}
                        <RadioGroup
                            label="Color"
                            name="color"
                            value={color}
                            onChange={(val) =>
                                setColor(val as "primary" | "secondary")
                            }
                            orientation="horizontal"
                            options={[
                                { value: "primary", label: "Primary" },
                                { value: "secondary", label: "Secondary" },
                            ]}
                        />

                        {/* Value Label Display */}
                        <RadioGroup
                            label="Value Label Display"
                            name="valueLabelDisplay"
                            value={valueLabelDisplay}
                            onChange={(val) =>
                                setValueLabelDisplay(
                                    val as "auto" | "on" | "off"
                                )
                            }
                            orientation="horizontal"
                            options={[
                                { value: "auto", label: "Auto" },
                                { value: "on", label: "On" },
                                { value: "off", label: "Off" },
                            ]}
                        />

                        {/* Track Mode */}
                        <RadioGroup
                            label="Track"
                            name="track"
                            value={String(track)}
                            onChange={(val) =>
                                setTrack(
                                    val === "false"
                                        ? false
                                        : (val as "normal" | "inverted")
                                )
                            }
                            orientation="horizontal"
                            options={[
                                { value: "normal", label: "Normal" },
                                { value: "inverted", label: "Inverted" },
                                { value: "false", label: "None" },
                            ]}
                        />

                        {/* Additional Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <Checkbox
                                label="Show marks"
                                checked={showMarks}
                                onChange={setShowMarks}
                            />
                            {showMarks && (
                                <div className="ml-6">
                                    <Checkbox
                                        label="Use custom mark labels"
                                        checked={useCustomMarks}
                                        onChange={setUseCustomMarks}
                                    />
                                </div>
                            )}
                            <Checkbox
                                label="Show mark labels on hover"
                                checked={showMarkLabelsOnHover}
                                onChange={setShowMarkLabelsOnHover}
                            />
                            <Checkbox
                                label="Disabled"
                                checked={disabled}
                                onChange={setDisabled}
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
                <Card variant="bordered" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number | number[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The value of the slider. For range
                                        sliders, provide an array
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        defaultValue
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number | number[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        0
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The default value for uncontrolled
                                        slider
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
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback fired when the value changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        min
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        0
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The minimum allowed value
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        max
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        100
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The maximum allowed value
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        step
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The granularity of value changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        marks
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean | SliderMark[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Show marks on the slider rail
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
                                        If true, the slider is disabled
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        orientation
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;horizontal&quot; |
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;horizontal&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The orientation of the slider
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;small&quot; | &quot;medium&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;medium&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The size of the slider
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        color
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;primary&quot; |
                                        &quot;secondary&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;primary&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The color of the slider
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        valueLabelDisplay
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;auto&quot; | &quot;on&quot; |
                                        &quot;off&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;auto&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Controls when the value label is
                                        displayed
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        showMarkLabelsOnHover
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Show value labels on hover over marks
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        track
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;normal&quot; |
                                        &quot;inverted&quot; | false
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;normal&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The track display mode
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        valueLabelFormat
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (value) =&gt; string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Function to format the value label
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
                                        &quot;&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Additional CSS classes
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
                <div className="space-y-6">
                    {/* Example 1: Basic Slider */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Basic Slider
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    A simple continuous slider.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={30}
                                        aria-label="Volume"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={30}\n  aria-label="Volume"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Discrete Slider with Marks */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Discrete Slider with Marks
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Slider with step increments and visible
                                    marks.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={20}
                                        step={10}
                                        marks
                                        min={0}
                                        max={100}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={20}\n  step={10}\n  marks\n  min={0}\n  max={100}\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Range Slider */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Range Slider
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Select a range of values with two thumbs.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={[20, 60]}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={[20, 60]}\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Vertical Slider */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Vertical Slider
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Slider oriented vertically.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex justify-center">
                                    <Slider
                                        defaultValue={50}
                                        orientation="vertical"
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={50}\n  orientation="vertical"\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: Colored Slider */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Colored Slider
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Slider with secondary color theme.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={40}
                                        color="secondary"
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={40}\n  color="secondary"\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 6: Custom Mark Labels */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Custom Mark Labels
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Slider with custom labels displayed below
                                    marks. Labels are always visible with
                                    consistent styling. Automatically snaps to
                                    mark positions.
                                </p>
                                <div className="p-6 pb-12 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={67}
                                        marks={[
                                            { value: 0, label: "Apple" },
                                            { value: 33, label: "Banana" },
                                            { value: 67, label: "Orange" },
                                            { value: 100, label: "Grape" },
                                        ]}
                                        min={0}
                                        max={100}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={67}\n  marks={[\n    { value: 0, label: "Apple" },\n    { value: 33, label: "Banana" },\n    { value: 67, label: "Orange" },\n    { value: 100, label: "Grape" },\n  ]}\n  min={0}\n  max={100}\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </SectionLayout>
    );
}
