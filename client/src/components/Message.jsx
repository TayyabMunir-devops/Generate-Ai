import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";
import "./Message.css";

export default function Message({ message }) {
  const [copied, setCopied] = useState(false);

  if (!message) return null;

  const role = message.role || "assistant";
  const content = message.content || "";

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`message-row ${role}`}>

      <div className="avatar">
        {role === "assistant" ? "🤖" : "👤"}
      </div>

      <div className={`message-bubble ${role}`}>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, children }) {
              const codeText = String(children);

              if (inline) {
                return <code className="inline-code">{children}</code>;
              }

              return (
                <div className="code-block">
                  <button onClick={() => copyCode(codeText)}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <pre>
                    <code>{children}</code>
                  </pre>
                </div>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>

        {role === "assistant" && (
          <span className="cursor">▍</span>
        )}

      </div>
    </div>
  );
}
