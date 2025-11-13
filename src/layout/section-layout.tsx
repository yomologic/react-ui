import React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
  hasStickyPreview?: boolean;
}

/**
 * SectionLayout - Wrapper component for showcase sections
 *
 * @param hasStickyPreview - When true, expects the first child to be a sticky preview section
 *                          that stays at the top while the rest of the content scrolls
 */
export function SectionLayout({
  children,
  hasStickyPreview = false,
}: SectionLayoutProps) {
  if (!hasStickyPreview) {
    // Normal layout - just render children with spacing
    return <>{children}</>;
  }

  // Convert children to array to separate sticky preview from scrollable content
  const childArray = React.Children.toArray(children);

  if (childArray.length === 0) {
    return null;
  }

  // First child is the sticky preview
  const stickyPreview = childArray[0];

  // Rest are scrollable content
  const scrollableContent = childArray.slice(1);

  return (
    <>
      {/* Sticky Preview at Top */}
      {stickyPreview}

      {/* Scrollable Content Below */}
      {scrollableContent.length > 0 && (
        <div className="space-y-8">{scrollableContent}</div>
      )}
    </>
  );
}
