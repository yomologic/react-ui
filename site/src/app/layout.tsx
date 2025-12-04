import { ThemeProvider } from "@yomologic/react-ui";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "@yomologic/react-ui - Component Library",
    description:
        "A modern, lightweight React UI component library built with TypeScript",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var savedTheme = localStorage.getItem('yomologic-theme') || 'dark';
                                    var darkTheme = {
                                        '--color-primary': '#19bfb7',
                                        '--color-primary-hover': '#16a39d',
                                        '--color-secondary': '#8b9ba8',
                                        '--color-background': '#0f1419',
                                        '--color-foreground': '#e3e8ed',
                                        '--color-muted': '#1a2028',
                                        '--color-muted-foreground': '#8b9ba8',
                                        '--color-border': '#2d3843',
                                        '--button-primary-text': '#0f1419',
                                        '--button-secondary-text': '#e3e8ed',
                                        '--color-info-muted': '#1a3a52',
                                        '--color-info-border': '#4d9de0',
                                        '--color-info-muted-foreground': '#4d9de0',
                                        '--color-success-muted': '#1a3d2e',
                                        '--color-success-border': '#4ec9b0',
                                        '--color-success-muted-foreground': '#4ec9b0',
                                        '--color-warning-muted': '#3d311a',
                                        '--color-warning-border': '#d4a574',
                                        '--color-warning-muted-foreground': '#d4a574',
                                        '--color-error-muted': '#3d1a25',
                                        '--color-error-border': '#e07088',
                                        '--color-error-muted-foreground': '#e07088'
                                    };
                                    var lightTheme = {
                                        '--color-primary': '#3b82f6',
                                        '--color-primary-hover': '#2563eb',
                                        '--color-secondary': '#6b7280',
                                        '--color-background': '#ffffff',
                                        '--color-foreground': '#111827',
                                        '--color-muted': '#f3f4f6',
                                        '--color-muted-foreground': '#6b7280',
                                        '--color-border': '#9ca3af',
                                        '--button-primary-text': '#ffffff',
                                        '--button-secondary-text': '#ffffff',
                                        '--color-info-muted': '#eff6ff',
                                        '--color-info-border': '#3b82f6',
                                        '--color-info-muted-foreground': '#1d4ed8',
                                        '--color-success-muted': '#f0fdf4',
                                        '--color-success-border': '#22c55e',
                                        '--color-success-muted-foreground': '#15803d',
                                        '--color-warning-muted': '#fefce8',
                                        '--color-warning-border': '#eab308',
                                        '--color-warning-muted-foreground': '#a16207',
                                        '--color-error-muted': '#fef2f2',
                                        '--color-error-border': '#ef4444',
                                        '--color-error-muted-foreground': '#b91c1c'
                                    };
                                    var theme = savedTheme === 'light' ? lightTheme : darkTheme;
                                    for (var key in theme) {
                                        document.documentElement.style.setProperty(key, theme[key]);
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
            </body>
        </html>
    );
}
