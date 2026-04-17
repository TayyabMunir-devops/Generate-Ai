import { useState, useRef, useEffect } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

export default function App() {
  const [dark, setDark] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "👋 Hello! I'm your AI assistant.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const idRef = useRef(2);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (inputText) => {
    if (!inputText.trim() || loading) return;

    const userMsg = {
      id: idRef.current++,
      role: "user",
      content: inputText,
    };

    const updated = [...messages, userMsg];
    setMessages(updated);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let text = "";
      const aiId = idRef.current++;

      setMessages((p) => [
        ...p,
        { id: aiId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        text += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId ? { ...m, content: text } : m
          )
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "app dark" : "app light"}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>💬 Chats</h3>
        <div className="chat-item">New Chat</div>
        <div className="chat-item">History 1</div>
        <div className="chat-item">History 2</div>
      </aside>

      {/* MAIN */}
      <div className="main">

        <header className="header">
          <h2>🤖 ChatGPT</h2>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        <main className="chat">
          <ChatWindow messages={messages} loading={loading} />
          <div ref={bottomRef} />
        </main>

        <div className="input-container">
          <InputBox onSendMessage={sendMessage} disabled={loading} />
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
