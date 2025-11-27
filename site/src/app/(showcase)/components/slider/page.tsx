"use client";

import {
    Card,
    CodeSnippet,
    Slider,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";

export default function SliderPage() {
    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Slider
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

                    {/* Example 2: Slider Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Slider Sizes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Sliders come in small and medium sizes.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Small
                                        </p>
                                        <Slider
                                            defaultValue={30}
                                            size="small"
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Medium
                                        </p>
                                        <Slider
                                            defaultValue={30}
                                            size="medium"
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  size="small"\n  defaultValue={30}\n  valueLabelDisplay="auto"\n/>\n\n<Slider\n  size="medium"\n  defaultValue={30}\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Discrete Slider with Marks */}
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

                    {/* Example 4: Value Label Display */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Value Label Display
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Control when value labels are shown: auto
                                    (on drag), on (always), or off (never).
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-8">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Auto (shows on drag)
                                        </p>
                                        <Slider
                                            defaultValue={30}
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Always visible
                                        </p>
                                        <Slider
                                            defaultValue={50}
                                            valueLabelDisplay="on"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Never shown
                                        </p>
                                        <Slider
                                            defaultValue={70}
                                            valueLabelDisplay="off"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  valueLabelDisplay="auto"\n  defaultValue={30}\n/>\n\n<Slider\n  valueLabelDisplay="on"\n  defaultValue={50}\n/>\n\n<Slider\n  valueLabelDisplay="off"\n  defaultValue={70}\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: Range Slider */}
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

                    {/* Example 6: Vertical Slider */}
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

                    {/* Example 7: Colored Slider */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Color Themes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Sliders support primary (blue) and secondary
                                    (purple) color themes.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Primary
                                        </p>
                                        <Slider
                                            defaultValue={40}
                                            color="primary"
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Secondary
                                        </p>
                                        <Slider
                                            defaultValue={60}
                                            color="secondary"
                                            valueLabelDisplay="auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  color="primary"\n  defaultValue={40}\n  valueLabelDisplay="auto"\n/>\n\n<Slider\n  color="secondary"\n  defaultValue={60}\n  valueLabelDisplay="auto"\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 8: Track Modes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Track Modes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Control track display: normal, inverted, or
                                    hidden.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Normal
                                        </p>
                                        <Slider
                                            defaultValue={30}
                                            track="normal"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Inverted
                                        </p>
                                        <Slider
                                            defaultValue={70}
                                            track="inverted"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            No track
                                        </p>
                                        <Slider
                                            defaultValue={50}
                                            track={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  track="normal"\n  defaultValue={30}\n/>\n\n<Slider\n  track="inverted"\n  defaultValue={70}\n/>\n\n<Slider\n  track={false}\n  defaultValue={50}\n/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Example 9: Custom Mark Labels */}
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

                    {/* Example 10: Disabled State */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Disabled State
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Disabled sliders are non-interactive and
                                    visually muted.
                                </p>
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <Slider
                                        defaultValue={50}
                                        disabled
                                        marks
                                        step={10}
                                    />
                                </div>
                            </div>
                            <div>
                                <CodeSnippet
                                    code={`<Slider\n  defaultValue={50}\n  disabled\n  marks\n  step={10}\n/>`}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                SECTION 2: API REFERENCE
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
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
                                        number | null
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The granularity of value changes. Set to
                                        null to restrict to marks only
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
                                        Show marks on the slider rail. Provide
                                        array for custom labels
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
        </SectionLayout>
    );
}
