"use client";

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
        icon: <MenuIcon className="w-5 h-5" />,
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
      <main className="w-full pt-16 lg:pt-0">
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
