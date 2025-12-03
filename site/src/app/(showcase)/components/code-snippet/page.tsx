"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetPage() {
    // Example 1: Language Support
    const [language1, setLanguage1] = useState<string>("tsx");

    // Sample code for different languages
    const sampleCode = {
        tsx: `import { Button } from "@yomologic/react-ui";

export default function App() {
  return (
    <Button variant="primary" size="lg">
      Click me!
    </Button>
  );
}`,
        javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
        python: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
        css: `.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: white;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}`,
        json: `{
  "name": "@yomologic/react-ui",
  "version": "1.0.0",
  "description": "Modern React component library",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}`,
    };

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Code Snippet
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Language Support */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Language Support
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                CodeSnippet supports syntax highlighting for
                                multiple programming languages with VS Code
                                Dark+ theme.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border h-[350px] overflow-auto">
                                            <CodeSnippet
                                                code={
                                                    sampleCode[
                                                        language1 as keyof typeof sampleCode
                                                    ]
                                                }
                                                language={language1}
                                            />
                                        </div>
                                        <RadioGroup
                                            label="Language"
                                            name="language-example1"
                                            value={language1}
                                            onChange={setLanguage1}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "tsx",
                                                    label: "TypeScript",
                                                },
                                                {
                                                    value: "javascript",
                                                    label: "JavaScript",
                                                },
                                                {
                                                    value: "python",
                                                    label: "Python",
                                                },
                                                { value: "css", label: "CSS" },
                                                {
                                                    value: "json",
                                                    label: "JSON",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            language1 === "tsx"
                                                ? `<CodeSnippet 
  code={\`import { Button } from "@yomologic/react-ui";

export default function App() {
  return <Button>Click me</Button>;
}\`}
/>`
                                                : `<CodeSnippet 
  code={\`${sampleCode[language1 as keyof typeof sampleCode].split("\n")[0]}...\`}
  language="${language1}"
/>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Features */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Built-in Features
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted mb-4">
                                CodeSnippet includes essential features for
                                displaying code examples.
                            </p>
                            <ul className="space-y-2 text-sm theme-text-muted">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)] mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Syntax highlighting with VS Code Dark+
                                        theme
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)] mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Copy to clipboard with visual feedback
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)] mt-0.5">
                                        ✓
                                    </span>
                                    <span>Hover tooltip on copy button</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary)] mt-0.5">
                                        ✓
                                    </span>
                                    <span>Responsive and accessible</span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                API REFERENCE
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="theme-surface border-b theme-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="theme-bg divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        code
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        The code string to display with syntax
                                        highlighting
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        language
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;tsx&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Programming language for syntax
                                        highlighting (tsx, javascript, python,
                                        css, json, etc.)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </SectionLayout>
    );
}
