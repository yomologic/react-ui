// Moved from src/components/ui/Rating.tsx for consistency
import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number; // e.g. 3.5
  max?: number; // default 5
  size?: number; // px (desktop size when responsive is true)
  color?: string; // default yellow
  className?: string;
  responsive?: boolean; // Auto-scale on small screens
  mobileSize?: number; // px (size for mobile when responsive is true)
}

// Generate unique ID for SVG gradients to avoid hydration issues
const generateId = () => `rating-${Math.random().toString(36).substr(2, 9)}`;

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 24,
  color = "#FFD600",
  className = "",
  responsive = false,
  mobileSize,
}) => {
  const uniqueId = React.useMemo(() => generateId(), []);

  // Determine sizes
  const actualMobileSize = mobileSize || Math.max(16, Math.floor(size * 0.7));
  const displaySize = size;
  const gap = Math.max(2, size * 0.15);

  const stars = [];
  for (let i = 1; i <= max; i++) {
    const isFull = value >= i;
    const isHalf = value >= i - 0.5 && value < i;
    const isEmpty = value < i - 0.5;

    stars.push(
      <span
        key={i}
        style={{
          position: "relative",
          display: "inline-block",
          width: responsive ? undefined : displaySize,
          height: responsive ? undefined : displaySize,
          flexShrink: 0,
          ...(responsive &&
            ({
              "--star-size": `${displaySize}px`,
              "--star-mobile-size": `${actualMobileSize}px`,
              width: "var(--star-size)",
              height: "var(--star-size)",
            } as React.CSSProperties)),
        }}
        className={
          responsive
            ? "sm:w-(--star-size) sm:h-(--star-size) w-(--star-mobile-size) h-(--star-mobile-size)"
            : ""
        }
      >
        {/* Base star outline */}
        <Star
          size={displaySize}
          color={isEmpty ? "#E0E0E0" : color}
          fill="none"
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        {/* Full star fill */}
        {isFull && (
          <Star
            size={displaySize}
            color={color}
            fill={color}
            style={{ position: "absolute", left: 0, top: 0 }}
          />
        )}
        {/* Half star overlay */}
        {isHalf && (
          <svg
            width={displaySize}
            height={displaySize}
            viewBox={`0 0 ${displaySize} ${displaySize}`}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <defs>
              <linearGradient
                id={`half-${uniqueId}-${i}`}
                x1="0"
                x2="1"
                y1="0"
                y2="0"
              >
                <stop offset="50%" stopColor={color} />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <Star
              size={displaySize}
              color={color}
              fill={`url(#half-${uniqueId}-${i})`}
            />
          </svg>
        )}
      </span>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stars}
    </div>
  );
};
