import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Specialist {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  status: 'online' | 'offline';
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm AgriBot, your AI-powered agricultural assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      content: "What are the best practices for growing corn?",
      sender: 'user',
      timestamp: new Date(Date.now() - 4 * 60 * 1000)
    },
    {
      id: '3',
      content: "For optimal corn growth, here are the key practices:\n\n1. **Soil Preparation**: Ensure well-drained soil with pH 6.0-6.8\n2. **Planting**: Space seeds 4-6 inches apart in rows 30 inches apart\n3. **Fertilization**: Apply nitrogen in split doses - at planting and when corn is knee-high\n4. **Watering**: Provide 1-1.5 inches per week, especially during tasseling\n5. **Pest Management**: Monitor for corn borer and rootworm regularly\n\nWould you like more details on any specific aspect?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const specialists: Specialist[] = [
    {
      id: 'general',
      name: 'AgriBot Assistant',
      avatar: '🤖',
      specialization: 'General Agricultural AI',
      status: 'online'
    },
    {
      id: 'crop',
      name: 'Dr. Anya Sharma',
      avatar: '🌱',
      specialization: 'Crop Specialist',
      status: 'online'
    },
    {
      id: 'pest',
      name: 'Prof. Michael Chen',
      avatar: '🐛',
      specialization: 'Pest & Disease Expert',
      status: 'online'
    },
    {
      id: 'irrigation',
      name: 'Dr. Sarah Johnson',
      avatar: '💧',
      specialization: 'Irrigation Specialist',
      status: 'offline'
    },
    {
      id: 'soil',
      name: 'Dr. Robert Martinez',
      avatar: '🌿',
      specialization: 'Soil Expert',
      status: 'online'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Mock AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(newMessage, selectedSpecialist),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateMockResponse = (message: string, specialist: string): string => {
    const responses = {
      general: "Thank you for your question! Based on your query, I'd recommend consulting with our specialists or checking our comprehensive guides for detailed information.",
      crop: "As a crop specialist, I can help you with planting schedules, variety selection, and growth optimization strategies for your specific crops.",
      pest: "I specialize in pest identification and management. Could you provide more details about the symptoms you're observing?",
      irrigation: "For irrigation planning, I need to know your crop type, soil conditions, and current weather patterns to provide the best recommendations.",
      soil: "Soil health is crucial for successful farming. I can help you with soil testing interpretation, fertilizer recommendations, and improvement strategies."
    };

    return responses[specialist as keyof typeof responses] || responses.general;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen pt-20 lg:pt-0 flex">
      {/* Specialists Sidebar */}
      <div className="hidden lg:block w-80 bg-sidebar border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Agricultural Specialists</h2>
        </div>
        <div className="p-4 space-y-2">
          {specialists.map((specialist) => (
            <button
              key={specialist.id}
              onClick={() => setSelectedSpecialist(specialist.id)}
              className={`w-full text-left p-4 rounded-lg transition-fast hover:bg-sidebar-accent ${
                selectedSpecialist === specialist.id ? 'bg-sidebar-primary text-sidebar-primary-foreground' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-2xl">{specialist.avatar}</span>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    specialist.status === 'online' ? 'bg-success' : 'bg-muted-foreground'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{specialist.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{specialist.specialization}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {specialists.find(s => s.id === selectedSpecialist)?.avatar}
            </span>
            <div>
              <h3 className="font-semibold text-foreground">
                {specialists.find(s => s.id === selectedSpecialist)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {specialists.find(s => s.id === selectedSpecialist)?.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  message.sender === 'user' ? 'bg-primary' : 'bg-muted-foreground'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={`rounded-lg px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 form-input-agricultural"
            />
            <button
              onClick={handleSendMessage}
              className="btn-agricultural p-3 rounded-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;