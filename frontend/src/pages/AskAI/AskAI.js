import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './AskAI.scss';

const AskAI = () => {
  const { translations } = useLanguage();
  const sectionsRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
      }, 100);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = sectionsRef.current;
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const suggestedQuestions = translations.askAI?.suggestedQuestions || [
    "What's the best family SUV under $30,000?",
    "How do I check if a used car has been in an accident?",
    "What should I look for when buying a used car?",
    "Compare sedan vs SUV for city driving"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: translations.askAI?.sampleResponse || "I'm here to help you with car-related questions! This is a placeholder response. In the future, I'll be powered by AI to provide detailed answers about car buying, maintenance, comparisons, and more.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="ask-ai-page">
      <div className="container">
        <div className="ai-header fade-in-up" ref={(el) => (sectionsRef.current[0] = el)}>
          <h1>{translations.askAI?.title || 'Ask AI Assistant'}</h1>
          <p>{translations.askAI?.subtitle || 'Get instant answers to your car-related questions'}</p>
        </div>

        {messages.length === 0 ? (
          <div className="welcome-section fade-in-up" ref={(el) => (sectionsRef.current[1] = el)}>
            <div className="ai-icon">🤖</div>
            <h2>{translations.askAI?.welcomeTitle || 'How can I help you today?'}</h2>
            <p>{translations.askAI?.welcomeText || 'Ask me anything about cars, buying tips, maintenance, comparisons, and more!'}</p>
            
            <div className="suggested-questions">
              <h3>{translations.askAI?.suggestedTitle || 'Try asking:'}</h3>
              <div className="questions-grid">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="suggested-question"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-section">
            <div className="chat-header">
              <button className="btn-clear" onClick={clearChat}>
                {translations.askAI?.clearChat || 'Clear Chat'}
              </button>
            </div>
            <div className="messages-container">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <form className="input-section" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={translations.askAI?.inputPlaceholder || 'Type your question here...'}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn-send"
              disabled={!inputValue.trim() || isLoading}
            >
              {translations.askAI?.sendButton || 'Send'} ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskAI;
