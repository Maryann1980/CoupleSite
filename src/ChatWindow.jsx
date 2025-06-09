import React, { useState, useEffect, useRef } from "react";

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0); // Tracks conversation flow
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const messagesEndRef = useRef(null);

  const romanticReplies = [
    "You just made my heart skip a beat ❤️",
    "Talking to you is my favorite part of the day 💕",
    "Every message from you feels like a sweet love note 🥰",
    "You have my full attention, always 💖",
    "Can't wait to hear more from you, my love 💌",
  ];

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial message
  useEffect(() => {
    setIsTyping(true);
    const timer1 = setTimeout(() => {
      addBotMessage("Do you remember when we first met?");
    }, 1000);
    return () => clearTimeout(timer1);
  }, []);

  const addBotMessage = (text) => {
    setIsTyping(false);
    setMessages((prev) => [...prev, { text, sender: "bot" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
    setInput("");

    // Check for "I love you"
    if (/i love you/i.test(trimmed)) {
      respondWithTyping("I love you more 💜");
      return;
    }

    // Conversation logic
    if (step === 0) {
      setStep(1);
      respondWithTyping(
        "Of course I remember… You wore that cute smile that made my whole world light up 🌟"
      );
      setTimeout(() => {
        respondWithTyping("Do you know why I love you so much?");
        setStep(2);
      }, 3500);
    } else if (step === 2) {
      setStep(3);
      respondWithTyping(
        "Because you see the real me, and still choose to love me every day 💞"
      );
      setTimeout(() => {
        respondWithTyping(
          "Don’t forget to unlock the secret message, I have a surprise for you… hint… the password is the day we went on our first date 😉"
        );
        setStep(4);
      }, 4000);
    } else if (step === 4) {
      if (trimmed.toLowerCase() === "love123") {
        respondWithTyping("You got it! Now close this and unlock the surprise 💋");
        setStep(5);
      } else {
        const guesses = wrongGuesses + 1;
        setWrongGuesses(guesses);
        if (guesses > 2) {
          respondWithTyping("Keep guessing, my love 💕");
        } else {
          respondWithTyping("Guess my love💌");
        }
      }
    } else {
      // Random romantic reply if outside the flow
      const random =
        romanticReplies[Math.floor(Math.random() * romanticReplies.length)];
      respondWithTyping(random);
    }
  };

  const respondWithTyping = (text) => {
    setIsTyping(true);
    setTimeout(() => addBotMessage(text), 1500);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Talk to me</span>
        <button onClick={onClose} aria-label="Close chat">
          &times;
        </button>
      </div>

      <div className="chat-messages" style={{ overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "user" ? "user" : "partner"}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="chat-message partner typing">Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="chat-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
