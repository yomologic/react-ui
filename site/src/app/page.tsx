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
} from "lucide-react";
import { SidebarNav, NavItem } from "@yomologic/react-ui";
import {
  ButtonsSection,
  InputsSection,
  CardsSection,
  BadgesSection,
  AlertSection,
  LoadingSection,
  LayoutSection,
  ExamplesSection,
} from "./sections";
import { DropdownSection } from "./sections/dropdown-section";
import { RadioSection } from "./sections/radio-section";
import { CheckboxSection } from "./sections/checkbox-section";

type SectionId =
  | "buttons"
  | "inputs"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "cards"
  | "badges"
  | "alert"
  | "loading"
  | "layout"
  | "examples";

const navItems: NavItem[] = [
  { id: "buttons", label: "Buttons", icon: <Circle className="w-5 h-5" /> },
  { id: "inputs", label: "Inputs", icon: <Type className="w-5 h-5" /> },
  {
    id: "dropdown",
    label: "Dropdown",
    icon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: "radio",
    label: "Radio Buttons",
    icon: <Circle className="w-5 h-5" />,
  },
  {
    id: "checkbox",
    label: "Checkboxes",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  { id: "cards", label: "Cards", icon: <CreditCard className="w-5 h-5" /> },
  { id: "badges", label: "Badges", icon: <Tag className="w-5 h-5" /> },
  {
    id: "alert",
    label: "Alerts",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: "loading",
    label: "Loading",
    icon: <Circle className="w-5 h-5" />,
  },
  { id: "layout", label: "Layout", icon: <Layout className="w-5 h-5" /> },
  { id: "examples", label: "Examples", icon: <Sparkles className="w-5 h-5" /> },
];

export default function ComponentShowcase() {
  const [activeSection, setActiveSection] = useState<SectionId>("buttons");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav
        title="Component Showcase"
        subtitle="Test all UI components"
        items={navItems}
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
    case "buttons":
      return <ButtonsSection />;
    case "inputs":
      return <InputsSection />;
    case "dropdown":
      return <DropdownSection />;
    case "radio":
      return <RadioSection />;
    case "checkbox":
      return <CheckboxSection />;
    case "cards":
      return <CardsSection />;
    case "badges":
      return <BadgesSection />;
    case "alert":
      return <AlertSection />;
    case "loading":
      return <LoadingSection />;
    case "layout":
      return <LayoutSection />;
    case "examples":
      return <ExamplesSection />;
    default:
      return null;
  }
}
