
import React, { useState } from 'react';
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I'm just a mock chatbot for now, but in the future, I'll help with all your North Dumdum pet needs!",
        isBot: true,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button 
        onClick={toggleChat} 
        size="icon"
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      <div className={cn(
        "absolute bottom-16 right-0 w-80 md:w-96 bg-background rounded-lg shadow-lg border overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-primary p-3 text-white">
          <h3 className="font-bold">PawBuddy</h3>
          <p className="text-xs opacity-80">Your North Dumdum Pet Assistant</p>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-3 flex flex-col gap-3">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "max-w-[80%] p-3 rounded-lg",
                message.isBot 
                  ? "bg-muted self-start rounded-bl-none" 
                  : "bg-primary/10 self-end rounded-br-none"
              )}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PawBuddy;
