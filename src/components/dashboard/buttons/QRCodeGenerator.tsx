
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { QRCodeForm } from "./QRCodeForm";
import { z } from "zod";

const formSchema = z.object({
  size: z.string().min(1, "Size is required"),
  foregroundColor: z.string().min(1, "Foreground color is required"),
  backgroundColor: z.string().min(1, "Background color is required"),
});

export const QRCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const profileUrl = "https://mochafan.com/your-username";
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  const defaultValues = {
    size: "200",
    foregroundColor: "#000000",
    backgroundColor: "#FFFFFF"
  };

  // Generate initial QR code
  React.useEffect(() => {
    generateQRCode(defaultValues);
  }, []);

  const generateQRCode = (values: z.infer<typeof formSchema>) => {
    // Remove the # from color codes
    const fgColor = values.foregroundColor.replace("#", "");
    const bgColor = values.backgroundColor.replace("#", "");
    
    // Generate QR code using QR code API
    const encodedUrl = encodeURIComponent(profileUrl);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${values.size}x${values.size}&data=${encodedUrl}&color=${fgColor}&bgcolor=${bgColor}`;
    
    setQrCodeUrl(url);
    setIsCustomizing(false);
    
    toast.success("QR Code generated!");
  };

  const downloadQRCode = () => {
    // Create a temporary link element to download the image
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "mochafan-qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>QR Code</CardTitle>
        <CardDescription>
          Generate a QR code for your MochaFan profile that you can display anywhere.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isCustomizing ? (
          <QRCodeForm 
            onSubmit={generateQRCode}
            defaultValues={defaultValues}
          />
        ) : (
          <>
            {/* QR Code Preview */}
            <div className="p-6 bg-white rounded-md border w-full flex justify-center">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for your MochaFan profile" 
                  className="w-48 h-48"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-md flex items-center justify-center">
                  Loading...
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsCustomizing(true)}
                variant="outline" 
                className="flex-1"
              >
                Customize
              </Button>
              
              <Button 
                onClick={downloadQRCode} 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
