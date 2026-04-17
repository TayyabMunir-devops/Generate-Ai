import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function Sidebar() {
  const { chats, setActiveChat } = useContext(ChatContext);

  return (
    <div className="sidebar">
      <h3>💬 Chats</h3>

      {chats.map(chat => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => setActiveChat(chat.id)}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
}