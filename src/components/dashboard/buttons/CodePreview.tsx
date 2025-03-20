
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code } from "lucide-react";
import { toast } from "sonner";

interface CodePreviewProps {
  code: string;
  language?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ 
  code, 
  language = "html" 
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1.5"
          onClick={() => setShowCode(!showCode)}
        >
          <Code className="h-3.5 w-3.5" />
          {showCode ? "Hide Code" : "View Code"}
        </Button>
        
        {showCode && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>
      
      {showCode && (
        <div className="relative">
          <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto text-xs">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
