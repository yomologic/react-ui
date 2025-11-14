import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = "tsx" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      {/* Copy Button */}
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={handleCopy}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-all duration-200 border border-gray-700 hover:border-gray-600 shadow-lg"
          aria-label="Copy code"
        >
          {copied ? (
            // Check icon
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            // Copy icon
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>

        {/* Tooltip */}
        {showTooltip && !copied && (
          <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap border border-gray-700">
            Copy code
            <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-800 border-l border-t border-gray-700 transform rotate-45"></div>
          </div>
        )}

        {copied && (
          <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-green-600 text-white text-xs rounded shadow-lg whitespace-nowrap">
            Copied!
            <div className="absolute -top-1 right-3 w-2 h-2 bg-green-600 transform rotate-45"></div>
          </div>
        )}
      </div>

      {/* Code Block with Syntax Highlighting */}
      <div className="rounded-lg overflow-hidden border border-gray-800">
        {/* @ts-expect-error - SyntaxHighlighter has typing issues with React 19 */}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem 3.5rem 1rem 1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            background: "#1a1b26",
          }}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
