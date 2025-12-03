"use client";

import { Drawer, DrawerNavSection, Header } from "@yomologic/react-ui";
import {
    Circle,
    Type,
    CheckSquare,
    CreditCard,
    Tag,
    MessageCircle,
    Layout,
    ChevronDown,
    Star,
    Menu as MenuIcon,
    PanelLeft,
    Code,
    MessageSquare,
    Minus,
    Sliders,
    ToggleLeft,
    Form,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navSections: DrawerNavSection[] = [
    {
        title: "Form Components",
        items: [
            {
                id: "inputs",
                label: "Inputs",
                icon: <Type className="w-5 h-5" />,
            },
            {
                id: "checkbox",
                label: "Checkboxes",
                icon: <CheckSquare className="w-5 h-5" />,
            },
            {
                id: "radio",
                label: "Radio Buttons",
                icon: <Circle className="w-5 h-5" />,
            },
            {
                id: "select",
                label: "Select",
                icon: <ChevronDown className="w-5 h-5" />,
            },
            {
                id: "switch",
                label: "Switch",
                icon: <ToggleLeft className="w-5 h-5" />,
            },
            {
                id: "form",
                label: "Form",
                icon: <Form className="w-5 h-5" />,
            },
        ],
    },
    {
        title: "UI Components",
        items: [
            {
                id: "alert",
                label: "Alerts",
                icon: <MessageCircle className="w-5 h-5" />,
            },
            {
                id: "badges",
                label: "Badges",
                icon: <Tag className="w-5 h-5" />,
            },
            {
                id: "buttons",
                label: "Buttons",
                icon: <Circle className="w-5 h-5" />,
            },
            {
                id: "cards",
                label: "Cards",
                icon: <CreditCard className="w-5 h-5" />,
            },
            {
                id: "code-snippet",
                label: "Code Snippet",
                icon: <Code className="w-5 h-5" />,
            },
            {
                id: "dialog",
                label: "Dialog",
                icon: <MessageSquare className="w-5 h-5" />,
            },
            {
                id: "divider",
                label: "Divider",
                icon: <Minus className="w-5 h-5" />,
            },
            {
                id: "rating",
                label: "Rating",
                icon: <Star className="w-5 h-5" />,
            },
            {
                id: "slider",
                label: "Slider",
                icon: <Sliders className="w-5 h-5" />,
            },
        ],
    },
    {
        title: "Feedback & Loading",
        items: [
            {
                id: "loading",
                label: "Loading",
                icon: <Circle className="w-5 h-5" />,
            },
        ],
    },
    {
        title: "Layout",
        items: [
            {
                id: "layout",
                label: "Layout",
                icon: <Layout className="w-5 h-5" />,
            },
            {
                id: "nav",
                label: "Navigation",
                icon: <MenuIcon className="w-5 h-5" />,
            },
            {
                id: "drawer",
                label: "Drawer",
                icon: <PanelLeft className="w-5 h-5" />,
            },
        ],
    },
];

export default function ShowcaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Extract the current section from pathname
    const currentSection = pathname.split("/").pop() || "buttons";

    const handleSectionChange = (sectionId: string) => {
        router.push(`/components/${sectionId}`);
    };

    return (
        <div
            className="min-h-screen"
            style={{ background: "var(--color-muted)" }}
        >
            {/* Header with auto-hide on scroll - desktop only, mobile uses Drawer header */}
            <Header
                autoHideOnScroll={true}
                className="hidden lg:block left-0 right-64 z-10 bg-(--color-background) border-b border-(--color-border)"
            >
                <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
                    >
                        <Image
                            src="/yomologic-logo-symbol.png"
                            alt="Yomologic"
                            width={40}
                            height={40}
                            className="group-hover:scale-105 transition-transform"
                        />
                        <span
                            className="font-semibold text-h3"
                            style={{ color: "var(--color-foreground)" }}
                        >
                            React UI
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>
            </Header>

            <main
                className="w-full pt-16 lg:pt-16 overflow-x-hidden"
                style={{ color: "var(--color-foreground)" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-72 py-8">
                    {children}
                </div>
            </main>
            <Drawer
                title="React UI Components"
                subtitle="Interactive Showcase"
                sections={navSections}
                activeItem={currentSection}
                onItemClick={handleSectionChange}
                position="right"
                homeUrl="/"
                autoHideOnScroll={true}
                headerActions={<ThemeToggle />}
            />
        </div>
    );
}
