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
import { Drawer, DrawerNavSection, Nav } from "@yomologic/react-ui";

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
      {/* Navigation using our Nav component */}
      <div className="fixed top-0 left-0 right-0 lg:right-64 z-40 lg:z-0">
        <Nav
          items={[
            {
              id: "home",
              label: "Home",
              type: "link",
              href: "/",
              icon: <Home className="w-4 h-4" />,
            },
          ]}
          logo={
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
          }
          variant="primary"
          sticky={false}
          size="lg"
        />
      </div>

      <main className="w-full pt-16">
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
