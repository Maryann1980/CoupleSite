import React, { useState, useEffect } from "react";

export function Guestbook() {
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage initially
    const saved = localStorage.getItem("guestbookMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Save messages to localStorage whenever messages state changes
  useEffect(() => {
    localStorage.setItem("guestbookMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { name: name.trim(), message: message.trim() },
    ]);

    setName("");
    setMessage("");
  };

  return (
    <section id="guestbook" className="guestbook">
      <h2>From friends & Family</h2>
      <form id="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="guest-name"
          placeholder="Your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          id="guest-message"
          rows="3"
          placeholder="Your message"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    <div className="guestbook-messages" id="guestbook-messages">
  {messages.map((msg, i) => (
    <p key={i} className="guestbook-message">
      <strong>{msg.name}:</strong> {msg.message}
    </p>
  ))}
</div>

    </section>
  );
}

export default Guestbook;
