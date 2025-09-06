import { useState, useRef, useEffect } from 'react';
import { Send, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface CropPrice {
  crop: string;
  price: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

const MarketAnalyst = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Dr. Emily Foster, your Market Analyst specialist. How can I help with market analysis today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: '2',
      content: "What are the current corn prices?",
      sender: 'user',
      timestamp: new Date(Date.now() - 8 * 60 * 1000)
    },
    {
      id: '3',
      content: "Current corn prices are around $5.20 per bushel, showing a 3.2% increase this week due to strong export demand and favorable weather concerns in competing regions. The trend looks positive for the next quarter.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 7 * 60 * 1000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cropPrices: CropPrice[] = [
    { crop: 'Corn', price: '$5.20/bushel', change: 3.2, trend: 'up' },
    { crop: 'Wheat', price: '$7.45/bushel', change: -1.8, trend: 'down' },
    { crop: 'Soybeans', price: '$13.80/bushel', change: 2.1, trend: 'up' },
    { crop: 'Rice', price: '$15.30/cwt', change: 0.5, trend: 'stable' },
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
        content: generateMarketResponse(newMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const generateMarketResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Current market prices are showing mixed trends. Corn and soybeans are up due to strong demand, while wheat has declined slightly. I recommend monitoring export reports and weather forecasts for better timing.";
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('forecast')) {
      return "Market trends suggest a bullish outlook for grain crops in Q3. Factors include increased global demand, weather concerns in major producing regions, and strong export commitments. Consider hedging strategies for price protection.";
    } else if (lowerMessage.includes('sell') || lowerMessage.includes('selling')) {
      return "For selling decisions, consider current basis levels, storage costs, and cash flow needs. The market is showing volatility, so timing is crucial. I can help analyze the best selling windows for your specific crops.";
    } else {
      return "I can provide insights on crop prices, market trends, trading strategies, and risk management. What specific market information would you like to discuss?";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Analyst
          </h1>
          <p className="text-lg text-muted-foreground">
            Get insights on crop prices, market trends, and analysis from our AI specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Data */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Prices */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Current Crop Prices</h2>
              </div>
              <div className="space-y-3">
                {cropPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(item.trend)}
                      <div>
                        <p className="font-medium text-foreground">{item.crop}</p>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${getTrendColor(item.change)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Market Insights</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm font-medium text-success mb-1">Strong Export Demand</p>
                  <p className="text-xs text-muted-foreground">Corn exports up 15% compared to last year</p>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium text-warning mb-1">Weather Concerns</p>
                  <p className="text-xs text-muted-foreground">Drought conditions affecting wheat yields</p>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-primary mb-1">Inventory Levels</p>
                  <p className="text-xs text-muted-foreground">Soybean stocks lower than expected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 card-agricultural p-0 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-agricultural text-white p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h3 className="font-semibold">Dr. Emily Foster</h3>
                  <p className="text-sm opacity-90">Market Analysis Specialist</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-agricultural text-white'
                    }`}>
                      {message.sender === 'user' ? 'You' : '📈'}
                    </div>
                    <div className={`rounded-lg px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-70`}>
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
                  placeholder="Ask about market trends, prices, or trading strategies..."
                  className="flex-1 form-input-agricultural"
                />
                <button
                  onClick={handleSendMessage}
                  className="btn-agricultural p-3 rounded-lg hover-lift"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyst;