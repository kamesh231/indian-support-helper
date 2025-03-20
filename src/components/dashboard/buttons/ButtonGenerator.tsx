
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { toast } from "sonner";
import { ColorPicker } from "./ColorPicker";
import { CodePreview } from "./CodePreview";

export const ButtonGenerator = () => {
  const [buttonText, setButtonText] = useState("Buy me a coffee");
  const [buttonColor, setButtonColor] = useState("#FFDD00");
  const [textColor, setTextColor] = useState("#000000");
  const [buttonPreview, setButtonPreview] = useState(true);

  const generateButtonCode = () => {
    const htmlCode = `<a href="https://mochafan.com/your-username" target="_blank" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: ${buttonColor}; color: ${textColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: 500; text-decoration: none; border-radius: 9999px; transition: all 0.2s ease;">
  <div style="display: flex; align-items: center; gap: 0.5rem;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
      <line x1="6" y1="2" x2="6" y2="4"></line>
      <line x1="10" y1="2" x2="10" y2="4"></line>
      <line x1="14" y1="2" x2="14" y2="4"></line>
    </svg>
    ${buttonText}
  </div>
</a>`;

    return htmlCode;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateButtonCode());
    toast.success("Button code copied to clipboard!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website buttons</CardTitle>
        <CardDescription>
          Create customizable buttons which take your audience to your Buy Me a Coffee page. You
          can add this to your site or blog.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Button Preview */}
        <div className="flex justify-center p-6 bg-gray-50 rounded-md border">
          <div className="browser-mockup">
            <div className="browser-dots">
              <div className="browser-dot bg-red-400"></div>
              <div className="browser-dot bg-yellow-400"></div>
              <div className="browser-dot bg-green-400"></div>
            </div>
            <div className="browser-content flex items-center justify-center p-8">
              <Button
                className="rounded-full flex items-center gap-2 shadow-md"
                style={{ backgroundColor: buttonColor, color: textColor }}
              >
                <Coffee className="h-4 w-4" />
                <span>{buttonText}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="button-text">Button Text</Label>
            <Input
              id="button-text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Buy me a coffee"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Button Color</Label>
              <ColorPicker color={buttonColor} onChange={setButtonColor} />
            </div>
            
            <div>
              <Label>Text Color</Label>
              <ColorPicker color={textColor} onChange={setTextColor} />
            </div>
          </div>
        </div>

        {/* Code Preview (hidden initially) */}
        <CodePreview code={generateButtonCode()} language="html" />

        {/* Generate Button */}
        <Button onClick={copyCode} className="w-full">Generate</Button>
      </CardContent>
    </Card>
  );
};
