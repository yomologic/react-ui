// UI Components
export { Button } from "./ui/button";
export { Input } from "./ui/input";
export { Textarea } from "./ui/textarea";
export type { TextareaProps } from "./ui/textarea";
export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardMedia,
    CardActions,
    CardActionArea,
} from "./ui/card";
export { Badge } from "./ui/badge";
export { Checkbox, CheckboxGroup } from "./ui/checkbox";
export { RadioGroup } from "./ui/radio";
export { Select } from "./ui/select";
export type { SelectOption, SelectProps } from "./ui/select";
export { NativeSelect } from "./ui/native-select";
export type { NativeSelectProps } from "./ui/native-select";
export { Form, useForm, useFormContext } from "./ui/form";
export type {
    FormState,
    FormContextValue,
    ValidationFunction,
} from "./ui/form";
export {
    FormControl,
    FormControlLabel,
    FormHelperText,
    useFormControl,
    useFormControlContext,
    useFormField,
} from "./ui/form-control";
export type {
    FormControlProps,
    FormControlState,
    FormControlContextValue,
    FormFieldProps,
    ValidationRule,
} from "./ui/form-control";
export { Spinner } from "./ui/spinner";
export { CodeSnippet } from "./ui/code-snippet";
export { Rating } from "./ui/rating";
export { Divider } from "./ui/divider";
export { Slider } from "./ui/slider";
export type { SliderProps, SliderMark } from "./ui/slider";
export { Switch } from "./ui/switch";
export type { SwitchProps } from "./ui/switch";
export {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
} from "./ui/dialog";

// Feedback Components
export { Alert } from "./feedback/alert";

// Layout Components
export { Container } from "./layout/container";
export { SectionLayout } from "./layout/section-layout";
export { Nav } from "./layout/nav";
export type { NavItem, NavProps } from "./layout/nav";
export { Drawer } from "./layout/drawer";
export type {
    DrawerProps,
    NavItem as DrawerNavItem,
    NavSection as DrawerNavSection,
} from "./layout/drawer";

/** @deprecated Use Drawer component instead. SidebarNav will be removed in v1.0.0 */
export { SidebarNav } from "./layout/sidebar-nav";
export type {
    NavItem as SidebarNavItem,
    NavSection,
} from "./layout/sidebar-nav";

// Shared Components
export { EmptyState } from "./shared/empty-state";

// Theme System
export { ThemeProvider, useTheme } from "./contexts/ThemeProvider";
export { default as themes } from "./themes";
export type { ThemeId } from "./themes";

// Utility functions
export { cn } from "./lib/utils";

// Validation constants and utilities
export {
    EMAIL_REGEX,
    URL_REGEX,
    PHONE_REGEX,
    DATE_REGEX,
    isValidEmail,
    isValidDate,
    isValidUrl,
    isValidPhone,
} from "./constants/validation";

// Formatting utilities
export {
    formatPhoneUS,
    formatPhoneIntl,
    formatCreditCard,
    formatDate,
    formatDateTime,
    getRawValue,
    applyFormat,
} from "./lib/formatting";
export type { FormatType } from "./lib/formatting";
