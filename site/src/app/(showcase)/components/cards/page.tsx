"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardMedia,
    CardActions,
    CardActionArea,
    RadioGroup,
    Checkbox,
    CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen, Zap } from "lucide-react";
import { useState } from "react";

export default function CardsPage() {
    const [variant, setVariant] = useState<string>("elevated");
    const [padding, setPadding] = useState<string>("md");
    const [hoverable, setHoverable] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showTitle, setShowTitle] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showContent, setShowContent] = useState(true);
    const [showFooter, setShowFooter] = useState(false);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (variant !== "default") props.push(`variant="${variant}"`);
        if (padding !== "md") props.push(`padding="${padding}"`);
        if (hoverable) props.push("hoverable");

        const propsString = props.join("\n  ");
        const parts: string[] = [];

        if (showHeader) {
            const headerParts: string[] = [];
            if (showTitle)
                headerParts.push("    <CardTitle>Card Title</CardTitle>");
            if (showDescription)
                headerParts.push(
                    "    <CardDescription>Card description</CardDescription>"
                );
            if (headerParts.length > 0) {
                parts.push(
                    `  <CardHeader>\n${headerParts.join("\n")}\n  </CardHeader>`
                );
            }
        }

        if (showContent) {
            parts.push(
                "  <CardContent>\n    <p>Your content here</p>\n  </CardContent>"
            );
        }

        if (showFooter) {
            parts.push(
                "  <CardFooter>\n    <button>Action</button>\n  </CardFooter>"
            );
        }

        return `<Card${props.length > 0 ? `\n  ${propsString}` : ""}>\n${parts.join(
            "\n"
        )}\n</Card>`;
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
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="max-w-md mx-auto">
                                    <Card
                                        variant={
                                            variant as
                                                | "default"
                                                | "bordered"
                                                | "elevated"
                                        }
                                        padding={
                                            padding as
                                                | "none"
                                                | "sm"
                                                | "md"
                                                | "lg"
                                        }
                                        hoverable={hoverable}
                                    >
                                        {showHeader && (
                                            <CardHeader>
                                                {showTitle && (
                                                    <CardTitle>
                                                        Card Title
                                                    </CardTitle>
                                                )}
                                                {showDescription && (
                                                    <CardDescription>
                                                        Card description
                                                    </CardDescription>
                                                )}
                                            </CardHeader>
                                        )}
                                        {showContent && (
                                            <CardContent>
                                                <p className="text-sm text-gray-700">
                                                    This is a card component
                                                    with customizable variants
                                                    and padding. Use the
                                                    checkboxes to toggle
                                                    different card sections.
                                                </p>
                                            </CardContent>
                                        )}
                                        {showFooter && (
                                            <CardFooter>
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                                                    Action
                                                </button>
                                            </CardFooter>
                                        )}
                                    </Card>
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
                                                    Card Code
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

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Card Sections
                            </h3>
                            <div className="space-y-2">
                                <Checkbox
                                    label="Show Header"
                                    checked={showHeader}
                                    onChange={setShowHeader}
                                />
                                {showHeader && (
                                    <div className="ml-6 space-y-2">
                                        <Checkbox
                                            label="Show Title"
                                            checked={showTitle}
                                            onChange={setShowTitle}
                                        />
                                        <Checkbox
                                            label="Show Description"
                                            checked={showDescription}
                                            onChange={setShowDescription}
                                        />
                                    </div>
                                )}
                                <Checkbox
                                    label="Show Content"
                                    checked={showContent}
                                    onChange={setShowContent}
                                />
                                <Checkbox
                                    label="Show Footer"
                                    checked={showFooter}
                                    onChange={setShowFooter}
                                />
                            </div>
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
                                        &quot;default&quot; |
                                        &quot;bordered&quot; |
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
                                        &quot;none&quot; | &quot;sm&quot; |
                                        &quot;md&quot; | &quot;lg&quot;
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

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Card Subcomponents
                    </h3>
                    <Card variant="elevated" padding="none">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Component
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Default Styles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardHeader
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Container for card header content
                                            (title, description, icons)
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            flex flex-col space-y-1.5
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardTitle
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Semantic h3 heading for the card
                                            title
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            text-lg font-semibold text-gray-800
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardDescription
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Muted text for card descriptions or
                                            subtitles
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            text-sm text-gray-600
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardContent
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Main content area of the card
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            pt-0
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardFooter
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Footer area for actions or
                                            additional content
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            flex items-center pt-4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardMedia
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Display images or videos with proper
                                            aspect ratios
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            w-full object-cover
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardActions
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Footer area for action buttons with
                                            proper spacing
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            flex items-center gap-2 p-4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            CardActionArea
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Makes entire card clickable with
                                            hover/focus states
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            cursor-pointer hover:bg-gray-50
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Usage Examples Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    {/* Basic Card with Header */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Card with Header and Footer
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card variant="elevated">
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card description goes here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">
                                        This is the main content area. Use
                                        CardContent to wrap your card body.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                        Action
                                    </button>
                                </CardFooter>
                            </Card>
                            <CodeSnippet
                                code={`<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      Card description goes here
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content...</p>
  </CardContent>
  <CardFooter>
    <button>Action</button>
  </CardFooter>
</Card>`}
                            />
                        </div>
                    </div>

                    {/* Simple Card */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Simple Card with Content Only
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card variant="bordered">
                                <CardContent>
                                    <p className="text-sm text-gray-700">
                                        You don&apos;t always need a header or
                                        footer. Use CardContent alone for simple
                                        cards.
                                    </p>
                                </CardContent>
                            </Card>
                            <CodeSnippet
                                code={`<Card variant="bordered">
  <CardContent>
    <p>Simple content...</p>
  </CardContent>
</Card>`}
                            />
                        </div>
                    </div>

                    {/* Card with Icon */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Card with Custom Header Content
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card
                                variant="elevated"
                                hoverable
                                className="group"
                            >
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg [background-color:var(--card-icon-purple-bg)] [color:var(--card-icon-purple-text)] flex items-center justify-center transition-colors group-hover:[background-color:var(--card-icon-purple-bg-hover)]">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <CardTitle>Powerful Feature</CardTitle>
                                    <CardDescription>
                                        Add icons or any custom content to
                                        headers
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">
                                        CardHeader is flexible - you can add
                                        icons, badges, or any custom elements
                                        alongside titles and descriptions.
                                    </p>
                                </CardContent>
                            </Card>
                            <CodeSnippet
                                code={`<Card variant="elevated" hoverable>
  <CardHeader>
    <div className="icon-wrapper">
      <Icon />
    </div>
    <CardTitle>Powerful Feature</CardTitle>
    <CardDescription>
      Add icons or custom content
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content...</p>
  </CardContent>
</Card>`}
                            />
                        </div>
                    </div>

                    {/* Card with Media */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Card with Image Media
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card variant="elevated">
                                <CardMedia
                                    component="img"
                                    image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                                    alt="Example"
                                    aspectRatio="16/9"
                                />
                                <CardContent>
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        Mountain Landscape
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Use CardMedia to display images with
                                        proper aspect ratios.
                                    </p>
                                </CardContent>
                                <CardActions>
                                    <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                                        Share
                                    </button>
                                    <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                                        Learn More
                                    </button>
                                </CardActions>
                            </Card>
                            <CodeSnippet
                                code={`<Card variant="elevated">
  <CardMedia
    component="img"
    image="/path/to/image.jpg"
    alt="Description"
    aspectRatio="16/9"
  />
  <CardContent>
    <h3>Title</h3>
    <p>Description...</p>
  </CardContent>
  <CardActions>
    <button>Share</button>
    <button>Learn More</button>
  </CardActions>
</Card>`}
                            />
                        </div>
                    </div>

                    {/* Card with Action Area */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Clickable Card with Action Area
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card variant="elevated">
                                <CardActionArea
                                    onClick={() => alert("Card clicked!")}
                                >
                                    <CardMedia
                                        image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
                                        aspectRatio="16/9"
                                    />
                                    <CardContent>
                                        <h3 className="font-semibold text-gray-800 mb-2">
                                            Interactive Card
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Click anywhere on this card to
                                            trigger an action.
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <CodeSnippet
                                code={`<Card variant="elevated">
  <CardActionArea onClick={handleClick}>
    <CardMedia
      image="/path/to/image.jpg"
      aspectRatio="16/9"
    />
    <CardContent>
      <h3>Interactive Card</h3>
      <p>Click anywhere...</p>
    </CardContent>
  </CardActionArea>
</Card>`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme Variables Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Theme Variables
                </h2>
                <Card variant="elevated" padding="lg">
                    <p className="text-sm text-gray-700 mb-4">
                        Card icon colors are themeable via CSS variables.
                        Customize these in your theme configuration:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                        <div className="space-y-1">
                            <div className="text-gray-600">
                                --card-icon-blue-bg
                            </div>
                            <div className="text-gray-600">
                                --card-icon-blue-bg-hover
                            </div>
                            <div className="text-gray-600">
                                --card-icon-blue-text
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                                + purple, green, orange, pink, indigo variants
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                        Use these variables with Tailwind&apos;s arbitrary
                        values:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs mt-2 overflow-x-auto">
                        <code className="text-gray-800">
                            className=&quot;[background-color:var(--card-icon-blue-bg)]
                            [color:var(--card-icon-blue-text)]&quot;
                        </code>
                    </div>
                </Card>
            </section>
        </SectionLayout>
    );
}
