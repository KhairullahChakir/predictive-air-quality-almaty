import { useState } from "react";
import "./AiChatWidget.css";

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Здравствуйте, вас приветствует ИИ консультант ICPAIR!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // --- FIX: Ensure we use the correct backend port (5005) ---
    let BASE_URL = process.env.REACT_APP_API_URL;
    if (!BASE_URL) {
        BASE_URL = "http://localhost:5005/api";
    }

    try {
      const response = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "Произошла ошибка 😥" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      {/* FIX: Removed the typo 'img' attribute from this button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        <img src="/Images/chat.svg" alt="chat"></img>
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>ИИ-консультант ICPAIR</span>
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {/* Show simple loading indicator inside chat */}
            {loading && <div className="chat-message bot">...</div>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Введите текст..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}