import { useState } from "react";

export default function InputBox({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <div className="inputBox">
      <button className="mic" onClick={startVoice}>
        🎤
      </button>

      <input
        className="inputField"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <button className="sendBtn" onClick={send} disabled={disabled}>
        ➤
      </button>
    </div>
  );
}
