import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, Code, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import type { JSONLdExport } from '@/lib/types/ethnobotanical';

interface JSONExportViewerProps {
  data: JSONLdExport;
  className?: string;
}

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

interface TreeNodeProps {
  keyName: string;
  value: JSONValue;
  depth?: number;
  isLast?: boolean;
}

function TreeNode({ keyName, value, depth = 0, isLast = false }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  const getValueColor = (val: JSONValue): string => {
    if (typeof val === 'string') return 'text-green-400';
    if (typeof val === 'number') return 'text-amber-400';
    if (typeof val === 'boolean') return 'text-purple-400';
    if (val === null) return 'text-red-400';
    return 'text-foreground';
  };

  const formatKey = (key: string): string => {
    // Highlight namespace prefixes
    if (key.includes(':')) {
      return key;
    }
    return key;
  };

  const getKeyColor = (key: string): string => {
    if (key.startsWith('@')) return 'text-pink-400';
    if (key.startsWith('dwc:')) return 'text-cyan-400';
    if (key.startsWith('lc:')) return 'text-emerald-400';
    if (key.startsWith('schema:')) return 'text-blue-400';
    if (key.startsWith('geo:')) return 'text-orange-400';
    return 'text-sky-400';
  };

  if (!isObject) {
    return (
      <div className="flex items-start gap-1" style={{ paddingLeft: `${depth * 16}px` }}>
        <span className={cn("font-mono text-sm", getKeyColor(keyName))}>&quot;{formatKey(keyName)}&quot;</span>
        <span className="text-muted-foreground">:</span>
        <span className={cn("font-mono text-sm", getValueColor(value))}>
          {typeof value === 'string' ? `"${value}"` : String(value)}
        </span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    );
  }

  const entries = isArray ? value.map((v, i) => [i.toString(), v] as [string, JSONValue]) : Object.entries(value as Record<string, JSONValue>);

  return (
    <div style={{ paddingLeft: `${depth * 16}px` }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 hover:bg-muted/50 rounded px-1 -ml-1"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        )}
        <span className={cn("font-mono text-sm", getKeyColor(keyName))}>&quot;{formatKey(keyName)}&quot;</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-muted-foreground font-mono text-sm">
          {isArray ? '[' : '{'}
        </span>
        {!isExpanded && (
          <>
            <span className="text-muted-foreground font-mono text-sm">...</span>
            <span className="text-muted-foreground font-mono text-sm">
              {isArray ? ']' : '}'}
            </span>
          </>
        )}
      </button>
      {isExpanded && (
        <div className="mt-1">
          {entries.map(([k, v], index) => (
            <TreeNode
              key={k}
              keyName={k}
              value={v}
              depth={depth + 1}
              isLast={index === entries.length - 1}
            />
          ))}
          <div style={{ paddingLeft: `${(depth + 1) * 16}px` }}>
            <span className="text-muted-foreground font-mono text-sm">
              {isArray ? ']' : '}'}
            </span>
            {!isLast && <span className="text-muted-foreground">,</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export function JSONExportViewer({ data, className }: JSONExportViewerProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data['@id']?.replace(/[^a-zA-Z0-9]/g, '_') || 'export'}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("bg-card rounded-lg border border-border overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Code className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">JSON-LD Export</h4>
            <p className="text-xs text-muted-foreground">Linked Data Format</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('tree')}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                viewMode === 'tree' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Tree
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                viewMode === 'raw' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Raw
            </button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Namespace Legend */}
      <div className="px-4 py-2 border-b border-border bg-muted/20">
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-muted-foreground">JSON-LD</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-muted-foreground">Darwin Core</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-muted-foreground">Local Contexts</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-muted-foreground">Schema.org</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 max-h-[500px] overflow-auto"
      >
        {viewMode === 'tree' ? (
          <div className="space-y-1">
            <span className="text-muted-foreground font-mono text-sm">{'{'}</span>
            {Object.entries(data).map(([key, value], index, arr) => (
              <TreeNode
                key={key}
                keyName={key}
                value={value as JSONValue}
                depth={1}
                isLast={index === arr.length - 1}
              />
            ))}
            <span className="text-muted-foreground font-mono text-sm">{'}'}</span>
          </div>
        ) : (
          <pre className="font-mono text-sm text-foreground/90 whitespace-pre-wrap">
            {jsonString}
          </pre>
        )}
      </motion.div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          ID: <span className="font-mono text-foreground/80">{data['@id']}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Published: {data['schema:datePublished']}
        </p>
      </div>
    </div>
  );
}
