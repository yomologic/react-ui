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
    CodeSnippet,
    Divider,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { BookOpen, Zap } from "lucide-react";
import { useState } from "react";

export default function CardsPage() {
    // Example 1: Variants
    const [variantControl, setVariantControl] = useState<string>("elevated");

    // Example 2: Card with Header and Footer
    const [paddingControl, setPaddingControl] = useState<string>("md");

    // Example 3: Card with Media
    // No state needed

    // Example 4: Clickable Card
    // No state needed

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Card
                </h2>

                <div className="space-y-6">
                    {/* Example 1: Card Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Card Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Choose between default, bordered, or elevated
                                card styles.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Card
                                                variant={
                                                    variantControl as
                                                        | "default"
                                                        | "bordered"
                                                        | "elevated"
                                                }
                                                hoverable
                                            >
                                                <CardHeader>
                                                    <CardTitle>
                                                        Card Title
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Card description text
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-700">
                                                        This card demonstrates
                                                        different visual
                                                        variants.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <RadioGroup
                                            label="Variant"
                                            name="variant-control"
                                            value={variantControl}
                                            onChange={setVariantControl}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "default",
                                                    label: "Default",
                                                },
                                                {
                                                    value: "bordered",
                                                    label: "Bordered",
                                                },
                                                {
                                                    value: "elevated",
                                                    label: "Elevated",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Card${variantControl !== "default" ? ` variant="${variantControl}"` : ""} hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      Card description text
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content...</p>
  </CardContent>
</Card>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Padding & Structure */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Padding & Structure
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Cards support header, content, and footer
                                sections with adjustable padding.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Card
                                                variant="elevated"
                                                padding={
                                                    paddingControl as
                                                        | "none"
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                }
                                            >
                                                <CardHeader>
                                                    <CardTitle>
                                                        Card with Footer
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Complete card structure
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-700">
                                                        Cards can have headers,
                                                        content, and footers.
                                                        Adjust padding to
                                                        control spacing.
                                                    </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                                        Action
                                                    </button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                        <RadioGroup
                                            label="Padding"
                                            name="padding-control"
                                            value={paddingControl}
                                            onChange={setPaddingControl}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "none",
                                                    label: "None",
                                                },
                                                { value: "sm", label: "Small" },
                                                {
                                                    value: "md",
                                                    label: "Medium",
                                                },
                                                { value: "lg", label: "Large" },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Card variant="elevated"${paddingControl !== "md" ? ` padding="${paddingControl}"` : ""}>
  <CardHeader>
    <CardTitle>Card with Footer</CardTitle>
    <CardDescription>
      Complete card structure
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content...</p>
  </CardContent>
  <CardFooter>
    <button>Action</button>
  </CardFooter>
</Card>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Card with Media */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Card with Media
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                CardMedia displays images with proper aspect
                                ratios. CardActions provides action buttons.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <Card
                                            variant="elevated"
                                            className="max-w-sm"
                                        >
                                            <CardMedia
                                                component="next-image"
                                                image="/yomologic-logo-symbol.png"
                                                alt="Yomologic logo"
                                                aspectRatio="16/9"
                                                className="bg-white p-8"
                                            />
                                            <CardContent>
                                                <h3 className="font-semibold text-gray-800 mb-2">
                                                    Featured Content
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    CardMedia displays images
                                                    with proper aspect ratios.
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
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Card variant="elevated">
  <CardMedia
    component="next-image"
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
                        </div>
                    </Card>

                    {/* Example 4: Clickable Card with Icon */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Clickable Card with Icon
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                CardActionArea makes the entire card clickable
                                with hover and focus states.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <Card
                                            variant="elevated"
                                            hoverable
                                            className="group"
                                        >
                                            <CardActionArea
                                                onClick={() =>
                                                    alert("Card clicked!")
                                                }
                                            >
                                                <CardHeader>
                                                    <div className="w-12 h-12 rounded-lg [background-color:var(--card-icon-purple-bg)] [color:var(--card-icon-purple-text)] flex items-center justify-center transition-colors group-hover:[background-color:var(--card-icon-purple-bg-hover)]">
                                                        <Zap className="w-6 h-6" />
                                                    </div>
                                                    <CardTitle>
                                                        Interactive Card
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Click anywhere to
                                                        trigger action
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-700">
                                                        CardActionArea makes the
                                                        entire card clickable
                                                        with hover and focus
                                                        states.
                                                    </p>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Card variant="elevated" hoverable>
  <CardActionArea onClick={handleClick}>
    <CardHeader>
      <div className="icon-wrapper">
        <Icon />
      </div>
      <CardTitle>Interactive Card</CardTitle>
      <CardDescription>
        Click anywhere...
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Content here...</p>
    </CardContent>
  </CardActionArea>
</Card>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                API REFERENCE
            ======================================== */}
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
        </SectionLayout>
    );
}
