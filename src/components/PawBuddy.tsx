import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const PawBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm PawBuddy, your North Dumdum Pet Assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue;
    const userMessage: Message = {
      id: messages.length + 1,
      text: userMessageText,
      isBot: false,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/pawbuddy-chat', { // Corrected URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessageText }),
      });

      if (!response.ok) {
        let errorDetail = `HTTP error ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.error || errorData.response || errorDetail;
        } catch (jsonError) {
          // If the error response isn't JSON, use the status text or default
          errorDetail = response.statusText || errorDetail;
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: messages.length + 2, // Ensure unique ID based on the new length
        text: data.response,
        isBot: true,
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error: any) {
      console.error('Error fetching chatbot response:', error);
      const errorMessageText = error.message && error.message.includes('Failed to fetch')
        ? "Sorry, I can't reach my server right now. Please check if the backend is running."
        : `Sorry, I'm having trouble: ${error.message || "Please try again later."}`;

      const errorMessage: Message = {
        id: messages.length + 2, // Ensure unique ID
        text: errorMessageText,
        isBot: true,
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      <div className={cn(
        "absolute bottom-16 right-0 w-80 md:w-96 bg-background rounded-lg shadow-xl border overflow-hidden transition-all duration-300 ease-in-out transform-gpu",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-primary p-3 text-primary-foreground">
          <h3 className="font-bold">PawBuddy</h3>
          <p className="text-xs opacity-90">Your North Dumdum Pet Assistant</p>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] p-3 rounded-lg text-sm",
                message.isBot
                  ? "bg-muted self-start rounded-bl-none"
                  : "bg-primary/10 text-primary-foreground self-end rounded-br-none bg-primary"
              )}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="self-start flex items-center space-x-2">
              <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                <span className="text-sm text-muted-foreground italic">PawBuddy is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t bg-background flex gap-2 items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-sm"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading} aria-label="Send message">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PawBuddy;