
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Facebook, Mail, QrCode, Copy } from "lucide-react";
import { toast } from "sonner";

interface SharePageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creatorName: string;
  username: string;
}

const SharePageDialog = ({ open, onOpenChange, creatorName, username }: SharePageDialogProps) => {
  const [pageLink, setPageLink] = useState(`mochafan.com/${username || "yourusername"}`);

  const copyPageLink = () => {
    navigator.clipboard.writeText(`https://${pageLink}`);
    toast.success("Page link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-center">Share {creatorName}'s page</DialogTitle>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="flex items-center gap-2 justify-center">
            <Twitter className="h-5 w-5" />
            <span>Twitter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 justify-center">
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 justify-center">
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 justify-center">
            <QrCode className="h-5 w-5" />
            <span>QR code</span>
          </Button>
        </div>
        
        <div>
          <h3 className="text-center font-medium mb-4">Share page link</h3>
          <div className="flex">
            <Input 
              value={pageLink} 
              onChange={(e) => setPageLink(e.target.value)} 
              className="rounded-r-none"
            />
            <Button 
              className="rounded-l-none" 
              onClick={copyPageLink}
            >
              Copy
            </Button>
          </div>
          
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium flex items-center">
              <span>Tip:</span>
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Add this link to your social bios.
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              <a href="#" className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 9.71a8.5 8.5 0 0 0-.91-4.13 2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3 2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48 9.55 9.55 0 0 0 .3 2 3.14 3.14 0 0 0 .71 1.36 2.86 2.86 0 0 0 1.49.78 45.18 45.18 0 0 0 6.5.33c3.5.05 6.57 0 10.2-.28a2.88 2.88 0 0 0 1.53-.78 2.49 2.49 0 0 0 .61-1 10.58 10.58 0 0 0 .52-3.4c.04-.56.04-3.94.04-4.54ZM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08Z" />
                </svg>
              </a>
              <a href="#" className="text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>
              <a href="#" className="text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              <a href="#" className="text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.64 5.93h1.43v4.4h-1.43v-4.4zm3.33-.3a1.23 1.23 0 1 1-2.46 0 1.23 1.23 0 0 1 2.46 0zM13 7.36h-1.43v6.59H13V7.36zm4.51 2.9v3.7h-1.44v-3.48c0-.6-.23-.9-.68-.9a.77.77 0 0 0-.7.49c-.04.09-.05.21-.05.33v3.55H13.2s.02-5.76 0-6.35h1.44v.9l-.01.02h.01v-.02a1.54 1.54 0 0 1 1.31-.73c.47 0 .85.14 1.12.42.31.36.47.85.47 1.47z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePageDialog;
