
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const GiphyLink = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Giphy Integration</CardTitle>
        <CardDescription>
          Create and share animated GIFs for your content using Giphy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg flex items-center justify-center">
          <img 
            src="https://giphy.com/static/img/giphy-logo-square.png" 
            alt="Giphy Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Use Giphy to create animated GIFs that you can share on your content or add to your supporters page.
        </p>

        {/* Link to Giphy */}
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={() => window.open("https://giphy.com/create/gifmaker", "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
          Open Giphy
        </Button>
      </CardContent>
    </Card>
  );
};
