import Message from './Message';
import './ChatWindow.css';

export default function ChatWindow({ messages = [], loading }) {
  return (
    <div className="chat-window">

      {messages.map((msg) =>
        msg ? <Message key={msg.id} message={msg} /> : null
      )}

      {loading && (
        <div className="typing">
          🤖 thinking<span className="dots">...</span>
        </div>
      )}

    </div>
  );
} 