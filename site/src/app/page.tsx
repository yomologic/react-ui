"use client";

import { Button, Card } from "@yomologic/react-ui";
import {
    Zap,
    Palette,
    Code2,
    Smartphone,
    Layers,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Image
                            src="/yomologic-logo-symbol.png"
                            alt="Yomologic"
                            width={60}
                            height={60}
                            className="w-14 h-14 sm:w-20 sm:h-20"
                        />
                        <div className="text-left">
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-primary">
                                Yomologic
                            </h1>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
                        React UI Components
                    </h2>
                    <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground">
                        Build beautiful interfaces in minutes. Production-ready
                        components with TypeScript and full theme control.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/components/buttons">
                            <Button size="lg" className="group">
                                Explore Components
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link
                            href="https://github.com/yomologic/react-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="lg">
                                <Code2 className="w-5 h-5 mr-2" />
                                View on GitHub
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-muted">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-1">
                                <Sparkles className="w-6 h-6 text-blue-600" />
                                <span>Active</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                In Development
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                100%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                TypeScript
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Themeable
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Custom Themes
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Open Source
                            </div>
                            <div className="text-sm text-muted-foreground">
                                MIT License
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="pb-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-blue-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-200">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Lightning Fast
                            </h3>
                            <p className="text-muted-foreground">
                                Optimized for performance with tree-shaking and
                                minimal bundle size. Only ship what you use.
                            </p>
                        </Card>

                        {/* Feature 2 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-purple-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-purple-200">
                                <Palette className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Fully Themeable
                            </h3>
                            <p className="text-muted-foreground">
                                Powerful theme system with CSS variables.
                                Customize colors, spacing, and density to match
                                your brand.
                            </p>
                        </Card>

                        {/* Feature 3 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-green-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-200">
                                <Code2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                TypeScript First
                            </h3>
                            <p className="text-muted-foreground">
                                Built with TypeScript for excellent IDE support
                                and type safety. Catch errors before they
                                happen.
                            </p>
                        </Card>

                        {/* Feature 4 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-orange-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-orange-200">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Mobile Ready
                            </h3>
                            <p className="text-muted-foreground">
                                Responsive by default with touch-friendly
                                interactions. Works perfectly on any device
                                size.
                            </p>
                        </Card>

                        {/* Feature 5 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-pink-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-pink-200">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Comprehensive
                            </h3>
                            <p className="text-muted-foreground">
                                15+ production-ready components covering forms,
                                navigation, feedback, and more.
                            </p>
                        </Card>

                        {/* Feature 6 */}
                        <Card
                            variant="elevated"
                            hoverable
                            padding="lg"
                            className="group border-gray-200 hover:border-indigo-300 transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-indigo-200">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Modern Stack
                            </h3>
                            <p className="text-muted-foreground">
                                Built with React 18+, Tailwind CSS, and modern
                                best practices. Future-proof architecture.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Quick Start Section */}
            <section className="py-20 bg-muted">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Get Started in Minutes
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Install and start building right away
                        </p>
                    </div>

                    <div className="rounded-xl shadow-lg p-8 mb-8 bg-background border border-border">
                        <div className="rounded-lg p-6 mb-6 bg-muted border border-border">
                            <code className="text-sm text-primary">
                                npm install @yomologic/react-ui
                            </code>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Import components from the library",
                                "Customize with your theme",
                                "Build amazing user experiences",
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-primary-subtle">
                                        <span className="text-xs font-semibold text-primary">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <p className="text-foreground">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/components/buttons">
                            <Button size="lg" variant="primary">
                                Browse Component Library
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-foreground">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-xl mb-12 text-muted-foreground">
                        Join developers building better user experiences with
                        Yomologic UI
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/components/buttons">
                            <Button size="lg">Start Exploring</Button>
                        </Link>
                        <Link
                            href="https://github.com/yomologic/react-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" variant="outline">
                                View Documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-muted">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <a
                        href="https://yomologic.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/yomologic-logo-symbol.png"
                            alt="Yomologic"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                            Yomologic
                        </span>
                    </a>
                    <p className="mb-4">
                        Building modern tools for developers.{" "}
                        <a
                            href="https://github.com/yomologic"
                            className="text-blue-400 hover:text-blue-300 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View our GitHub
                        </a>
                    </p>
                    <p className="text-sm">
                        Open source and available under the MIT License
                    </p>
                </div>
            </footer>
        </div>
    );
}
