
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { toast } from "sonner";
import { ColorPicker } from "./ColorPicker";
import { CodePreview } from "./CodePreview";

export const WidgetGenerator = () => {
  const [message, setMessage] = useState("Thanks for visiting. You can buy me a coffee if you enjoy this.");
  const [brandColor, setBrandColor] = useState("#F97316");
  
  const generateWidgetCode = () => {
    const htmlCode = `<div style="border-radius: 12px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); max-width: 350px; margin: 0 auto;">
  <div style="background-color: #fff; padding: 12px;">
    <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;"></div>
    <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;"></div>
    <div style="background-color: ${brandColor}; padding: 16px; border-radius: 8px; display: flex; align-items: center; justify-content: center;"></div>
  </div>
  <div style="background-color: #fff; padding: 16px; border-top: 1px solid #f3f4f6;">
    <p style="margin: 0 0 12px; font-size: 14px; color: #4b5563;">${message}</p>
    <a href="https://mochafan.com/your-username" style="display: flex; align-items: center; gap: 8px; text-decoration: none; background-color: ${brandColor}; color: #000; padding: 8px 16px; border-radius: 9999px; font-weight: 500; width: fit-content;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
      Buy me a coffee
    </a>
  </div>
</div>`;

    return htmlCode;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateWidgetCode());
    toast.success("Widget code copied to clipboard!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website widget</CardTitle>
        <CardDescription>
          Allow your audience to buy you a coffee right from your own website. Customize the widget
          with a message and your brand color.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Widget Preview */}
        <div className="flex justify-center p-6 bg-gray-50 rounded-md border">
          <div className="browser-mockup">
            <div className="browser-dots">
              <div className="browser-dot bg-red-400"></div>
              <div className="browser-dot bg-yellow-400"></div>
              <div className="browser-dot bg-green-400"></div>
            </div>
            <div className="browser-content flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden w-64">
                <div className="p-4">
                  <div className="bg-gray-100 h-16 rounded-lg mb-2"></div>
                  <div className="bg-gray-100 h-16 rounded-lg mb-2"></div>
                  <div style={{ backgroundColor: brandColor }} className="h-16 rounded-lg"></div>
                </div>
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">{message}</p>
                  <Button 
                    size="sm" 
                    className="rounded-full flex items-center gap-1.5"
                    style={{ backgroundColor: brandColor }}
                  >
                    <Coffee className="h-3.5 w-3.5" />
                    <span className="text-xs">Buy me a coffee</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="widget-message">Widget Message</Label>
            <Input
              id="widget-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thanks for visiting..."
            />
          </div>
          
          <div>
            <Label>Brand Color</Label>
            <ColorPicker color={brandColor} onChange={setBrandColor} />
          </div>
        </div>

        {/* Code Preview */}
        <CodePreview code={generateWidgetCode()} language="html" />

        {/* Generate Button */}
        <Button onClick={copyCode} className="w-full">Generate</Button>
      </CardContent>
    </Card>
  );
};
