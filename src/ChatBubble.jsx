import React, { useState } from "react";
import ChatWindow from "./ChatWindow";


export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
     <div
  className="chat-bubble"
  onClick={toggleChat}
  title="Chat with me"
  style={{ fontSize: "28px", lineHeight: 1, userSelect: "none" }}
>
  💬
</div>

      {/* Show chat window if open */}
      {isOpen && <ChatWindow onClose={toggleChat} />}
    </>
  );
}
