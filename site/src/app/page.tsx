"use client";

import { useState } from "react";
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
  Menu,
} from "lucide-react";
import { SidebarNav, NavSection } from "@yomologic/react-ui";
import {
  ButtonsSection,
  InputsSection,
  CardsSection,
  BadgesSection,
  AlertSection,
  LoadingSection,
  LayoutSection,
  ExamplesSection,
  NavSection as NavShowcaseSection,
} from "./sections";
import { DropdownSection } from "./sections/dropdown";
import { RadioSection } from "./sections/radio";
import { CheckboxSection } from "./sections/checkbox";

import { Rating } from "./sections";
import { Star } from "lucide-react";

type SectionId =
  | "alert"
  | "badges"
  | "buttons"
  | "cards"
  | "checkbox"
  | "dropdown"
  | "examples"
  | "inputs"
  | "layout"
  | "loading"
  | "nav"
  | "radio"
  | "rating";

const navSections: NavSection[] = [
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
      { id: "nav", label: "Navigation", icon: <Menu className="w-5 h-5" /> },
      { id: "layout", label: "Layout", icon: <Layout className="w-5 h-5" /> },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        id: "examples",
        label: "Examples",
        icon: <Sparkles className="w-5 h-5" />,
      },
    ],
  },
];

export default function ComponentShowcase() {
  const [activeSection, setActiveSection] = useState<SectionId>("inputs");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav
        title="Component Showcase"
        subtitle="Test all UI components"
        sections={navSections}
        activeItem={activeSection}
        onItemClick={(id) => setActiveSection(id as SectionId)}
        // position="left" // uncomment to move sidebar to left
        footer={
          <div className="text-xs text-gray-500 space-y-1">
            <p>Built with Tailwind CSS</p>
            <p>TypeScript + React</p>
          </div>
        }
      />

      {/* Main Content Area - No shifting, overlay goes on top */}
      <main className="flex-1 pt-16 lg:pt-0 lg:mr-64 bg-gray-50 min-w-0">
        <div className="p-4 md:p-8 bg-gray-50 min-w-0">
          <div className="max-w-5xl mx-auto space-y-8 min-w-0">
            {renderSectionContent(activeSection)}
          </div>
        </div>
      </main>
    </div>
  );
}

function renderSectionContent(sectionId: SectionId) {
  switch (sectionId) {
    case "alert":
      return <AlertSection />;
    case "badges":
      return <BadgesSection />;
    case "buttons":
      return <ButtonsSection />;
    case "cards":
      return <CardsSection />;
    case "checkbox":
      return <CheckboxSection />;
    case "dropdown":
      return <DropdownSection />;
    case "examples":
      return <ExamplesSection />;
    case "inputs":
      return <InputsSection />;
    case "layout":
      return <LayoutSection />;
    case "loading":
      return <LoadingSection />;
    case "nav":
      return <NavShowcaseSection />;
    case "radio":
      return <RadioSection />;
    case "rating":
      return <Rating />;
    default:
      return null;
  }
}
