import { createContext, useState } from "react";

export const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: []
    }
  ]);

  const [activeChat, setActiveChat] = useState(1);

  const addMessage = (chatId, message) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider value={{
      chats,
      setChats,
      activeChat,
      setActiveChat,
      addMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}