import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export const ArrayInput = ({
  label,
  values,
  onChange,
  placeholder = 'Add item...',
  suggestions = []
}: ArrayInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!values.includes(suggestion)) {
      onChange([...values, suggestion]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {suggestions.filter(s => !values.includes(s)).slice(0, 5).map((suggestion) => (
            <Badge
              key={suggestion}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              + {suggestion}
            </Badge>
          ))}
        </div>
      )}

      <AnimatePresence>
        {values.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="secondary" className="gap-1 pr-1">
                  {value}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
