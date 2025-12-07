"use client";

import {
    Textarea,
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function TextareaPage() {
    // State for Basic example
    const [basicValue, setBasicValue] = useState("");

    // State for Rows example
    const [rowsCount, setRowsCount] = useState<string>("3");

    // State for Resize example
    const [resizeOption, setResizeOption] = useState<string>("vertical");

    // State for Auto-resize example
    const [autoResizeEnabled, setAutoResizeEnabled] = useState(true);

    // State for Character Count example
    const [characterCountEnabled, setCharacterCountEnabled] = useState(true);

    // State for Validation example
    const [validationValue, setValidationValue] = useState("");

    // State for States example
    const [textareaState, setTextareaState] = useState<string>("normal");

    // State for Label & Helper example
    const [showLabel, setShowLabel] = useState(true);
    const [showHelper, setShowHelper] = useState(true);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Textarea
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Basic Textarea */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Basic Textarea
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                A multi-line text input for longer content. By
                                default, it allows vertical resizing.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Description"
                                                placeholder="Enter your description..."
                                                value={basicValue}
                                                onChange={(e) =>
                                                    setBasicValue(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Description"
  placeholder="Enter your description..."
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Rows */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Rows
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Control the initial height by specifying the
                                number of visible text rows.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Message"
                                                placeholder="Type your message..."
                                                rows={parseInt(rowsCount)}
                                                resize="none"
                                            />
                                        </div>

                                        {/* Controls */}
                                        <RadioGroup
                                            label="Rows"
                                            name="rowsCount"
                                            value={rowsCount}
                                            onChange={setRowsCount}
                                            orientation="horizontal"
                                            options={[
                                                { value: "2", label: "2 rows" },
                                                { value: "3", label: "3 rows" },
                                                { value: "5", label: "5 rows" },
                                                {
                                                    value: "10",
                                                    label: "10 rows",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Message"
  placeholder="Type your message..."
  rows={${rowsCount}}
  resize="none"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Resize Options */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Resize Options
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Control user resizing behavior with the resize
                                prop. Choose between none, vertical, horizontal,
                                or both.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Comment"
                                                placeholder="Try resizing this textarea..."
                                                resize={
                                                    resizeOption as
                                                        | "none"
                                                        | "vertical"
                                                        | "horizontal"
                                                        | "both"
                                                }
                                            />
                                        </div>

                                        {/* Controls */}
                                        <RadioGroup
                                            label="Resize Behavior"
                                            name="resizeOption"
                                            value={resizeOption}
                                            onChange={setResizeOption}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "none",
                                                    label: "None",
                                                },
                                                {
                                                    value: "vertical",
                                                    label: "Vertical",
                                                },
                                                {
                                                    value: "horizontal",
                                                    label: "Horizontal",
                                                },
                                                {
                                                    value: "both",
                                                    label: "Both",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Comment"
  placeholder="Try resizing this textarea..."
  resize="${resizeOption}"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Auto-resize */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Auto-resize
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Automatically grows to fit content up to a
                                maximum height. Perfect for chat interfaces and
                                dynamic forms.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Auto-growing Text"
                                                placeholder="Start typing... The textarea will grow automatically"
                                                autoResize={autoResizeEnabled}
                                                maxHeight={300}
                                            />
                                        </div>

                                        {/* Controls */}
                                        <Checkbox
                                            label="Enable auto-resize"
                                            checked={autoResizeEnabled}
                                            onChange={setAutoResizeEnabled}
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Auto-growing Text"
  placeholder="Start typing..."${autoResizeEnabled ? "\n  autoResize" : ""}
  maxHeight={300}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: Character Count */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Character Count
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Display a character counter when maxLength is
                                set. Useful for enforcing length limits.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Tweet"
                                                placeholder="What's happening?"
                                                maxLength={280}
                                                showCharacterCount={
                                                    characterCountEnabled
                                                }
                                                helperText="Keep it short and sweet"
                                            />
                                        </div>

                                        {/* Controls */}
                                        <Checkbox
                                            label="Show character count"
                                            checked={characterCountEnabled}
                                            onChange={setCharacterCountEnabled}
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Tweet"
  placeholder="What's happening?"
  maxLength={280}${characterCountEnabled ? "\n  showCharacterCount" : ""}
  helperText="Keep it short and sweet"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 6: Validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Built-in validation with required, minLength,
                                and maxLength attributes. Custom validation can
                                be added with the validate prop.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                            <Textarea
                                                label="Bio"
                                                placeholder="Tell us about yourself..."
                                                required
                                                minLength={10}
                                                maxLength={200}
                                                value={validationValue}
                                                onChange={(e) =>
                                                    setValidationValue(
                                                        e.target.value
                                                    )
                                                }
                                                helperText="10-200 characters required"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  required
  minLength={10}
  maxLength={200}
  helperText="10-200 characters required"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 7: States */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            States
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Textarea supports different states including
                                error, disabled, and read-only.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label="Feedback"
                                                placeholder="Share your thoughts..."
                                                error={
                                                    textareaState === "error"
                                                        ? "This field is required"
                                                        : undefined
                                                }
                                                disabled={
                                                    textareaState === "disabled"
                                                }
                                                readOnly={
                                                    textareaState === "readonly"
                                                }
                                            />
                                        </div>

                                        {/* Controls */}
                                        <RadioGroup
                                            label="State"
                                            name="textareaState"
                                            value={textareaState}
                                            onChange={setTextareaState}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "normal",
                                                    label: "Normal",
                                                },
                                                {
                                                    value: "error",
                                                    label: "Error",
                                                },
                                                {
                                                    value: "disabled",
                                                    label: "Disabled",
                                                },
                                                {
                                                    value: "readonly",
                                                    label: "Read Only",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea
  label="Feedback"
  placeholder="Share your thoughts..."${textareaState === "error" ? '\n  error="This field is required"' : ""}${textareaState === "disabled" ? "\n  disabled" : ""}${textareaState === "readonly" ? "\n  readOnly" : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 8: Label & Helper Text */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Label & Helper Text
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Add labels above the textarea and helper text
                                below for additional context.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Textarea
                                                label={
                                                    showLabel
                                                        ? "Comments"
                                                        : undefined
                                                }
                                                placeholder="Add your comments..."
                                                helperText={
                                                    showHelper
                                                        ? "Your feedback helps us improve"
                                                        : undefined
                                                }
                                            />
                                        </div>

                                        {/* Controls */}
                                        <div className="flex flex-wrap gap-4">
                                            <Checkbox
                                                label="Show Label"
                                                checked={showLabel}
                                                onChange={setShowLabel}
                                            />
                                            <Checkbox
                                                label="Show Helper Text"
                                                checked={showHelper}
                                                onChange={setShowHelper}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Textarea${showLabel ? '\n  label="Comments"' : ""}
  placeholder="Add your comments..."${showHelper ? '\n  helperText="Your feedback helps us improve"' : ""}
/>`}
                                    />
                                </div>
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
                <h2 className="text-h2 font-semibold theme-text mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="theme-surface border-b theme-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="theme-bg divide-y theme-border">
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Label text displayed above the textarea
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        placeholder
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Placeholder text when textarea is empty
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        rows
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        3
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Number of visible text rows (initial
                                        height)
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        resize
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;none&quot; | &quot;vertical&quot;
                                        | &quot;horizontal&quot; |
                                        &quot;both&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Controls user resizing behavior
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        autoResize
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Automatically grows to fit content
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        maxHeight
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        500
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Maximum height in pixels when
                                        auto-resizing
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        showCharacterCount
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Display character count when maxLength
                                        is set
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        error
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Error message to display
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        helperText
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Helper text displayed below textarea
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Marks the field as required
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        disabled
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Disables the textarea
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        readOnly
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Makes the textarea read-only
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        minLength
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Minimum character length
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        maxLength
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Maximum character length
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        name
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Field name (required when used in Form)
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        validate
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        (value: string) =&gt; string | undefined
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Custom validation function
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        fullWidth
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Make textarea full width of container
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
