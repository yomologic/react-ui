"use client";

import React, { useState, useRef, useEffect } from "react";

export interface SliderMark {
    value: number;
    label?: string;
}

export interface SliderProps {
    /**
     * The value of the slider. For range sliders, provide an array.
     */
    value?: number | number[];
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: number | number[];
    /**
     * Callback function that is fired when the slider's value changed.
     */
    onChange?: (value: number | number[]) => void;
    /**
     * The minimum allowed value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * The maximum allowed value of the slider.
     * @default 100
     */
    max?: number;
    /**
     * The granularity with which the slider can step through values.
     * @default 1
     */
    step?: number;
    /**
     * Marks indicate predetermined values to which the user can move the slider.
     * If `true`, marks are generated automatically. If `false`, no marks are shown.
     * You can also provide an array of marks with custom labels.
     * @default false
     */
    marks?: boolean | SliderMark[];
    /**
     * If `true`, the slider will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The orientation of the slider.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The size of the slider.
     * @default "medium"
     */
    size?: "small" | "medium";
    /**
     * Controls when the value label is displayed.
     * @default "auto"
     */
    valueLabelDisplay?: "on" | "auto" | "off";
    /**
     * The color of the slider.
     * @default "primary"
     */
    color?: "primary" | "secondary";
    /**
     * The track display mode.
     * @default "normal"
     */
    track?: "normal" | "inverted" | false;
    /**
     * A function to format the value label.
     */
    valueLabelFormat?: (value: number) => string;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * The id of the input element.
     */
    id?: string;
    /**
     * The name of the input element.
     */
    name?: string;
    /**
     * Accessible label for the slider.
     */
    "aria-label"?: string;
    /**
     * The id of the element containing a label for the slider.
     */
    "aria-labelledby"?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    marks = false,
    disabled = false,
    orientation = "horizontal",
    size = "medium",
    valueLabelDisplay = "auto",
    color = "primary",
    track = "normal",
    valueLabelFormat = (v) => String(v),
    className = "",
    id,
    name,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
}) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(
        controlledValue ?? defaultValue
    );
    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const currentValue = isControlled ? controlledValue : internalValue;
    const isRange = Array.isArray(currentValue);
    const isVertical = orientation === "vertical";

    // Update internal value when controlled value changes
    useEffect(() => {
        if (isControlled) {
            setInternalValue(controlledValue);
        }
    }, [isControlled, controlledValue]);

    // Clamp values when min/max changes
    useEffect(() => {
        if (isRange && Array.isArray(currentValue)) {
            const clampedValues = currentValue.map((v) =>
                Math.max(min, Math.min(max, v))
            );
            if (
                clampedValues[0] !== currentValue[0] ||
                clampedValues[1] !== currentValue[1]
            ) {
                updateValue(clampedValues);
            }
        } else if (typeof currentValue === "number") {
            const clampedValue = Math.max(min, Math.min(max, currentValue));
            if (clampedValue !== currentValue) {
                updateValue(clampedValue);
            }
        }
    }, [min, max]);

    // Calculate percentage for a value
    const valueToPercent = (val: number) => {
        const clampedVal = Math.max(min, Math.min(max, val));
        return ((clampedVal - min) / (max - min)) * 100;
    };

    // Calculate value from mouse position
    const getValueFromPosition = (clientX: number, clientY: number) => {
        if (!sliderRef.current) return min;

        const rect = sliderRef.current.getBoundingClientRect();
        const percent = isVertical
            ? ((rect.bottom - clientY) / rect.height) * 100
            : ((clientX - rect.left) / rect.width) * 100;

        const clampedPercent = Math.max(0, Math.min(100, percent));
        let newValue = min + (clampedPercent / 100) * (max - min);

        // Snap to step
        if (step) {
            newValue = Math.round(newValue / step) * step;
        }

        return Math.max(min, Math.min(max, newValue));
    };

    // Handle mouse/touch move
    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging || disabled) return;

        const newValue = getValueFromPosition(clientX, clientY);

        if (isRange && Array.isArray(currentValue)) {
            const values = [...currentValue];
            if (activeThumb !== null) {
                values[activeThumb] = newValue;
                // Ensure values stay in order
                if (activeThumb === 0 && values[0] > values[1]) {
                    values[0] = values[1];
                } else if (activeThumb === 1 && values[1] < values[0]) {
                    values[1] = values[0];
                }
                updateValue(values);
            }
        } else {
            updateValue(newValue);
        }
    };

    // Update value
    const updateValue = (newValue: number | number[]) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    // Mouse down handler
    const handleMouseDown =
        (thumbIndex?: number) => (e: React.MouseEvent | React.TouchEvent) => {
            if (disabled) return;

            e.preventDefault();
            setIsDragging(true);
            setActiveThumb(thumbIndex ?? 0);

            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

            if (thumbIndex === undefined) {
                const newValue = getValueFromPosition(clientX, clientY);
                updateValue(newValue);
            }
        };

    // Global mouse move and up handlers
    useEffect(() => {
        if (!isDragging) return;

        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            handleMove(clientX, clientY);
        };

        const handleGlobalUp = () => {
            setIsDragging(false);
            setActiveThumb(null);
        };

        document.addEventListener("mousemove", handleGlobalMove);
        document.addEventListener("mouseup", handleGlobalUp);
        document.addEventListener("touchmove", handleGlobalMove);
        document.addEventListener("touchend", handleGlobalUp);

        return () => {
            document.removeEventListener("mousemove", handleGlobalMove);
            document.removeEventListener("mouseup", handleGlobalUp);
            document.removeEventListener("touchmove", handleGlobalMove);
            document.removeEventListener("touchend", handleGlobalUp);
        };
    }, [isDragging, activeThumb]);

    // Generate marks
    const getMarks = (): SliderMark[] => {
        if (marks === false) return [];
        if (marks === true) {
            const marksList: SliderMark[] = [];
            for (let i = min; i <= max; i += step) {
                marksList.push({ value: i });
            }
            return marksList;
        }
        return marks;
    };

    const marksList = getMarks();

    // Color styles
    const colorStyles = {
        primary: {
            track: "bg-blue-500",
            thumb: "bg-blue-500",
            thumbHover: "hover:bg-blue-600",
            thumbRing: "ring-blue-500/30",
            thumbRingHover: "group-hover:ring-blue-500/30",
        },
        secondary: {
            track: "bg-purple-500",
            thumb: "bg-purple-500",
            thumbHover: "hover:bg-purple-600",
            thumbRing: "ring-purple-500/30",
            thumbRingHover: "group-hover:ring-purple-500/30",
        },
    };

    const currentColorStyles = colorStyles[color];

    // Size styles
    const sizeStyles = {
        small: {
            rail: isVertical ? "w-1" : "h-1",
            thumb: "w-3 h-3",
            thumbActive: "w-4 h-4",
            ringHover: "group-hover:ring-4",
            ringActive: "ring-6",
        },
        medium: {
            rail: isVertical ? "w-1" : "h-1",
            thumb: "w-4 h-4",
            thumbActive: "w-5 h-5",
            ringHover: "group-hover:ring-4",
            ringActive: "ring-8",
        },
    };

    const currentSizeStyles = sizeStyles[size];

    // Calculate track position and width
    const getTrackStyle = () => {
        if (track === false) return { display: "none" };

        if (isRange && Array.isArray(currentValue)) {
            const [start, end] = currentValue;
            const startPercent = valueToPercent(start);
            const endPercent = valueToPercent(end);

            if (isVertical) {
                return {
                    bottom: `${startPercent}%`,
                    height: `${endPercent - startPercent}%`,
                };
            }
            return {
                left: `${startPercent}%`,
                width: `${endPercent - startPercent}%`,
            };
        }

        const percent = valueToPercent(currentValue as number);

        if (track === "inverted") {
            if (isVertical) {
                return {
                    bottom: `${percent}%`,
                    height: `${100 - percent}%`,
                };
            }
            return {
                left: `${percent}%`,
                width: `${100 - percent}%`,
            };
        }

        // Normal track
        if (isVertical) {
            return {
                bottom: "0%",
                height: `${percent}%`,
            };
        }
        return {
            left: "0%",
            width: `${percent}%`,
        };
    };

    // Render thumbs
    const renderThumbs = () => {
        const values = isRange
            ? (currentValue as number[])
            : [currentValue as number];

        return values.map((val, index) => {
            const percent = valueToPercent(val);
            const isActive = isDragging && activeThumb === index;
            const showLabel =
                valueLabelDisplay === "on" ||
                (valueLabelDisplay === "auto" && isActive);

            const thumbStyle = isVertical
                ? { bottom: `${percent}%` }
                : { left: `${percent}%` };

            return (
                <div
                    key={index}
                    className={`absolute ${isVertical ? "-right-1.5" : "-top-1.5"} transform ${isVertical ? "" : "-translate-x-1/2"} ${isVertical ? "translate-y-1/2" : ""} cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""} group`}
                    style={thumbStyle}
                    onMouseDown={handleMouseDown(index)}
                    onTouchStart={handleMouseDown(index)}
                >
                    <div
                        className={`${isActive ? currentSizeStyles.thumbActive : currentSizeStyles.thumb} ${currentColorStyles.thumb} ${!isActive && currentColorStyles.thumbHover} rounded-full shadow-md transition-all ${isActive ? `${currentSizeStyles.ringActive} ${currentColorStyles.thumbRing}` : `group-hover:shadow-lg ${currentSizeStyles.ringHover} ${currentColorStyles.thumbRingHover}`} ${disabled ? "pointer-events-none" : ""}`}
                    />
                    {showLabel && (
                        <div
                            className={`absolute ${isVertical ? "left-6" : "-top-8"} ${isVertical ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2"} px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap`}
                        >
                            {valueLabelFormat(val)}
                        </div>
                    )}
                </div>
            );
        });
    };

    const containerClasses = isVertical
        ? "flex flex-col items-center py-4"
        : "flex items-center w-full px-2";

    const railClasses = isVertical
        ? `${currentSizeStyles.rail} relative overflow-visible`
        : `w-full ${currentSizeStyles.rail} relative overflow-visible`;

    return (
        <div
            className={`${containerClasses} ${className}`}
            style={
                isVertical ? { minHeight: "200px", height: "200px" } : undefined
            }
        >
            <div
                ref={sliderRef}
                className={railClasses}
                style={isVertical ? { height: "100%" } : undefined}
                onMouseDown={handleMouseDown()}
                onTouchStart={handleMouseDown()}
                role="slider"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={isRange ? undefined : (currentValue as number)}
                aria-disabled={disabled}
                aria-orientation={orientation}
                tabIndex={disabled ? -1 : 0}
            >
                {/* Rail */}
                <div
                    className={`absolute ${isVertical ? "inset-x-0 h-full" : "inset-y-0 w-full"} bg-gray-300 rounded-full ${disabled ? "opacity-50" : ""}`}
                />

                {/* Track */}
                {track !== false && (
                    <div
                        className={`absolute ${isVertical ? "inset-x-0" : "inset-y-0"} ${currentColorStyles.track} rounded-full ${disabled ? "opacity-50" : ""}`}
                        style={getTrackStyle()}
                    />
                )}

                {/* Marks */}
                {marksList.map((mark) => {
                    const markPercent = valueToPercent(mark.value);
                    const markStyle = isVertical
                        ? { bottom: `${markPercent}%` }
                        : { left: `${markPercent}%` };

                    return (
                        <div key={mark.value}>
                            <div
                                className={`absolute ${isVertical ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2"} w-1 h-1 bg-gray-300 rounded-full`}
                                style={markStyle}
                            />
                            {mark.label && (
                                <div
                                    className={`absolute ${isVertical ? "left-6" : "top-4"} text-xs text-gray-400 ${isVertical ? "top-0 -translate-y-1/2" : "left-0 -translate-x-1/2"}`}
                                    style={markStyle}
                                >
                                    {mark.label}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Thumbs */}
                {renderThumbs()}
            </div>

            {/* Hidden input for form submission */}
            {name && (
                <input
                    type="hidden"
                    id={id}
                    name={name}
                    value={
                        isRange
                            ? (currentValue as number[]).join(",")
                            : (currentValue as number)
                    }
                />
            )}
        </div>
    );
};
