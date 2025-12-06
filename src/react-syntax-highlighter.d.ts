// Type declaration override for react-syntax-highlighter to fix React 19 compatibility
declare module "react-syntax-highlighter" {
    import { ComponentType, ReactNode } from "react";

    export interface SyntaxHighlighterProps {
        language?: string;
        style?: any;
        customStyle?: React.CSSProperties;
        lineProps?: any;
        wrapLines?: boolean;
        wrapLongLines?: boolean;
        showLineNumbers?: boolean;
        showInlineLineNumbers?: boolean;
        startingLineNumber?: number;
        lineNumberContainerStyle?: any;
        lineNumberStyle?: any;
        renderer?: any;
        PreTag?: any;
        CodeTag?: any;
        children?: ReactNode;
        [key: string]: any;
    }

    export const Prism: ComponentType<SyntaxHighlighterProps>;
    export default Prism;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
    export const vscDarkPlus: any;
    export const vs: any;
    export const dark: any;
    export const funky: any;
    export const okaidia: any;
    export const twilight: any;
    export const coy: any;
    export const solarizedlight: any;
    export const tomorrow: any;
    export const atomDark: any;
    export const materialDark: any;
    export const materialLight: any;
    export const materialOceanic: any;
}
