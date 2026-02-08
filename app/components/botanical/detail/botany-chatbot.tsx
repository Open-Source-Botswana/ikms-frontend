import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, Loader2, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/lib/utils';
import type { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatbotProps {
  plantData: Partial<EthnobotanicalMetadata>;
}

const generateResponse = (query: string, plantData: Partial<EthnobotanicalMetadata>): string => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('medicinal') || lowerQuery.includes('medicine') || lowerQuery.includes('heal')) {
    return `**${plantData.name}** has several medicinal qualities including: ${plantData.medicinalQualities?.slice(0, 4).join(', ') || 'none'}. It has been traditionally used for ${plantData.traditionalUses?.[0]?.toLowerCase() || 'none'} and ${plantData.traditionalUses?.[1]?.toLowerCase() || 'none'}.`;
  }

  if (lowerQuery.includes('chemical') || lowerQuery.includes('compound') || lowerQuery.includes('active')) {
    return `The main active compounds in **${plantData.name}** are: ${plantData.modernMedicine?.activeCompounds.join(', ') || 'none'}. These compounds contribute to its ${plantData.medicinalQualities?.slice(0, 2).join(' and ').toLowerCase() || 'none'} properties.`;
  }

  if (lowerQuery.includes('traditional') || lowerQuery.includes('use') || lowerQuery.includes('indigenous')) {
    return `Traditionally, **${plantData.name}** (known locally as ${plantData.localNames?.join(' or ') || 'none'}) has been used by the ${plantData.culturalAuthority?.communityName || 'none'} for:\n\n${plantData.traditionalUses?.slice(0, 4).map(u => `• ${u}`).join('\n')}`;
  }

  if (lowerQuery.includes('research') || lowerQuery.includes('study') || lowerQuery.includes('science')) {
    const study = plantData.research?.recentStudies[0];
    return `Recent research on **${plantData.name}** includes:\n\n📚 "${study?.title || 'none'}" (${study?.year || 'none'})\n\n**Findings:** ${study?.findings || 'none'}\n\n*Source: ${study?.source || 'none'}*`;
  }

  if (lowerQuery.includes('origin') || lowerQuery.includes('where') || lowerQuery.includes('from')) {
    return `**${plantData.name}** originates from ${plantData.origin}. It belongs to the ${plantData.family} family and is associated with the ${plantData.associatedTerritory}. The plant thrives in well-drained soils and dry grassland conditions.`;
  }

  if (lowerQuery.includes('consent') || lowerQuery.includes('permission') || lowerQuery.includes('access')) {
    return `The knowledge about **${plantData.name}** is governed by the ${plantData.culturalAuthority?.communityName || 'none'}.\n\n**Consent Status:** ${plantData.consentStatus}\
    \n**Access Protocol:** ${plantData.accessProtocol}
    \n\nLabels: ${[...plantData.tkLabels?.filter(Boolean) || [], ...plantData.bcLabels?.filter(Boolean) || []].join(', ')}`;
  }

  return `**${plantData.name}** (${plantData.scientificName}) is ${plantData.description?.slice(0, 200)}...\n\nWould you like to know more about its medicinal properties, traditional uses, chemical compounds, or recent research?`;
};

export function AIChatbot({ plantData }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your ethnobotanical research assistant. I have detailed information about **${plantData.name || 'this plant'}**. Ask me about its medicinal properties, traditional uses, chemical composition, or recent research!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(input, plantData);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const suggestedQuestions = [
    'What are the medicinal properties?',
    'Tell me about traditional uses',
    'What compounds does it contain?',
    'What does recent research show?'
  ];

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <Bot className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-xl bg-card overflow-hidden flex flex-col h-[500px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Research Assistant</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-powered plant knowledge
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(true)}
          className="h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === 'assistant' ? "bg-primary/10" : "bg-secondary"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                message.role === 'assistant'
                  ? "bg-muted text-foreground rounded-tl-none"
                  : "bg-primary text-primary-foreground rounded-tr-none"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content.split('**').map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-muted/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this plant..."
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
