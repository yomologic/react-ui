"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Circle,
  Type,
  CheckSquare,
  CreditCard,
  Tag,
  MessageCircle,
  Layout,
  Sparkles,
  ChevronDown,
  Star,
  Menu as MenuIcon,
  PanelLeft,
  Home,
} from "lucide-react";
import { Drawer, DrawerNavSection } from "@yomologic/react-ui";

const navSections: DrawerNavSection[] = [
  {
    title: "Form Components",
    items: [
      { id: "inputs", label: "Inputs", icon: <Type className="w-5 h-5" /> },
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
        id: "dropdown",
        label: "Dropdown",
        icon: <ChevronDown className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "UI Components",
    items: [
      { id: "buttons", label: "Buttons", icon: <Circle className="w-5 h-5" /> },
      { id: "badges", label: "Badges", icon: <Tag className="w-5 h-5" /> },
      { id: "cards", label: "Cards", icon: <CreditCard className="w-5 h-5" /> },
      {
        id: "alert",
        label: "Alerts",
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        id: "rating",
        label: "Rating",
        icon: <Star className="w-5 h-5" />,
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
      { id: "layout", label: "Layout", icon: <Layout className="w-5 h-5" /> },
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
  {
    title: "Advanced",
    items: [
      {
        id: "examples",
        label: "Examples",
        icon: <Sparkles className="w-5 h-5" />,
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
    <div className="min-h-screen bg-gray-50">
      {/* Desktop-only header with logo - mobile uses Drawer header */}
      <header className="hidden lg:block fixed top-0 left-0 right-64 bg-white border-b border-gray-200 z-10">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center">
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
            <span className="font-semibold text-gray-900 text-lg">
              React UI
            </span>
          </Link>
        </div>
      </header>

      <main className="w-full pt-8 lg:pt-16">
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
      />
    </div>
  );
}
