"use client";

import { Card, RadioGroup, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetPage() {
    const [language, setLanguage] = useState<string>("tsx");
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

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

    // Generate code snippet for usage
    const generateCode = () => {
        const props: string[] = [];

        props.push(
            `code={\`${
                sampleCode[language as keyof typeof sampleCode].split("\n")[0]
            }...\`}`
        );
        if (language !== "tsx") props.push(`language="${language}"`);

        const propsString = props.join("\n  ");
        return `<CodeSnippet\n  ${propsString}\n/>`;
    };

    return (
        <SectionLayout hasStickyPreview>
            {/* ========================================
          SECTION 1: STICKY LIVE PREVIEW
      ======================================== */}
            <section className="sticky top-0 z-15 py-4 bg-gray-50">
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Code Snippet Live Preview
                            </h2>
                            <button
                                onClick={() =>
                                    setShowCodeOverlay(!showCodeOverlay)
                                }
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                                title="View code"
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                Code
                            </button>
                        </div>

                        {/* Preview Content */}
                        <div className="relative">
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <CodeSnippet
                                    code={
                                        sampleCode[
                                            language as keyof typeof sampleCode
                                        ]
                                    }
                                    language={language}
                                />
                            </div>

                            {/* Code Overlay */}
                            {showCodeOverlay && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={() =>
                                            setShowCodeOverlay(false)
                                        }
                                    />
                                    {/* Overlay Card */}
                                    <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Component Code
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        setShowCodeOverlay(
                                                            false
                                                        )
                                                    }
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                                    title="Close"
                                                >
                                                    <span className="text-2xl leading-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <CodeSnippet
                                                    code={generateCode()}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 2: INTERACTIVE CONTROLS
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        {/* Language Selection */}
                        <RadioGroup
                            label="Language"
                            name="language"
                            value={language}
                            onChange={setLanguage}
                            orientation="horizontal"
                            options={[
                                { value: "tsx", label: "TypeScript" },
                                { value: "javascript", label: "JavaScript" },
                                { value: "python", label: "Python" },
                                { value: "css", label: "CSS" },
                                { value: "json", label: "JSON" },
                            ]}
                        />

                        {/* Additional Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                <p className="font-semibold mb-2">Features:</p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>
                                        Syntax highlighting with VS Code Dark+
                                        theme
                                    </li>
                                    <li>
                                        Copy to clipboard with visual feedback
                                    </li>
                                    <li>Hover tooltip on copy button</li>
                                    <li>Responsive and accessible</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 3: API REFERENCE
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        code
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The code string to display with syntax
                                        highlighting
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        language
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;tsx&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
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

            {/* ========================================
          SECTION 4: USAGE EXAMPLES
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Basic Usage */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Basic Usage
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CodeSnippet
                                code={`import { Button } from "@yomologic/react-ui";

export default function App() {
  return <Button>Click me</Button>;
}`}
                            />
                            <CodeSnippet
                                code={`<CodeSnippet 
  code={\`import { Button } from "@yomologic/react-ui";

export default function App() {
  return <Button>Click me</Button>;
}\`}
/>`}
                            />
                        </div>
                    </div>

                    {/* Example 2: Different Languages */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Different Languages
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CodeSnippet
                                code={`def hello_world():
    print("Hello, World!")
    
hello_world()`}
                                language="python"
                            />
                            <CodeSnippet
                                code={`<CodeSnippet 
  code={\`def hello_world():
    print("Hello, World!")
    
hello_world()\`}
  language="python"
/>`}
                            />
                        </div>
                    </div>

                    {/* Example 3: JSON Configuration */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            JSON Configuration
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CodeSnippet
                                code={`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`}
                                language="json"
                            />
                            <CodeSnippet
                                code={`<CodeSnippet 
  code={\`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}\`}
  language="json"
/>`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </SectionLayout>
    );
}
