import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Camera, Link, X, Copy, AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SettingsPage = () => {
  const [gaCode, setGaCode] = useState("");
  const [pageLink, setPageLink] = useState("mochafan.com/yourusername");
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("your.email@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("United States");

  const copyPageLink = () => {
    navigator.clipboard.writeText(`https://${pageLink}`);
    toast.success("Page link copied to clipboard!");
  };

  const openPageLink = () => {
    window.open(`https://${pageLink}`, "_blank");
  };

  const saveChanges = () => {
    toast.success("Changes saved successfully!");
  };

  const disableAccount = () => {
    toast.error("Account temporarily disabled");
  };

  const deleteAccount = () => {
    toast.error("Account deletion requested");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl py-8 px-4"
      >
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Link className="h-5 w-5 text-primary" />
          <AlertTitle className="flex items-center gap-2">
            Your Profile URL
            <span className="text-sm font-normal text-muted-foreground">
              (Share with your audience)
            </span>
          </AlertTitle>
          <AlertDescription className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-primary">
              mochafan.com/{pageLink.split('/').pop()}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1" onClick={copyPageLink}>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
              <Button size="sm" className="gap-1" onClick={openPageLink}>
                <ExternalLink className="h-3.5 w-3.5" />
                Visit
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6 border-b rounded-none w-full justify-start h-auto bg-transparent p-0 space-x-8">
            <TabsTrigger 
              value="general" 
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="account"
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Page Link</CardTitle>
                <CardDescription>Your MochaFan page link that you can share with your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Input 
                      value={pageLink} 
                      onChange={(e) => setPageLink(e.target.value)}
                      className="pl-[140px]"
                    />
                    <div className="absolute left-0 top-0 h-full flex items-center px-3 text-muted-foreground bg-gray-50 border-r rounded-l-md">
                      mochafan.com/
                    </div>
                  </div>
                  <Button variant="outline" size="icon" onClick={copyPageLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={openPageLink}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>
                  Add your Google Analytics tracking code to send page visitor data to your Google Analytics account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ga-code">Google Analytics Tracking ID</Label>
                  <Input
                    id="ga-code"
                    placeholder="UA-XXXXXXXX-Y or G-XXXXXXXXXX"
                    value={gaCode}
                    onChange={(e) => setGaCode(e.target.value)}
                  />
                </div>
                <Button onClick={saveChanges} className="w-full">Save changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
                <CardDescription>Update your personal information and profile settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">Name</Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="profile-email">Email</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="profile-country">Country</Label>
                    <Input
                      id="profile-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Set a password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Social links</h3>
                  <p className="text-muted-foreground mb-4">
                    Confirm your identity by linking your social media accounts.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    <span>Connect account</span>
                  </Button>
                </div>

                <Button onClick={saveChanges} className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-red-500">Disable account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="mb-2">
                      Your account will be temporarily deactivated and will not be accessible
                      publicly. You will be logged out in the process, and the page will be re-enabled when you log back in.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="destructive" 
                    onClick={disableAccount}
                  >
                    Disable
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-500">Delete your account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <X className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="mb-2">
                      Your account, along with all associated data, content, credit card, and payout information, will be permanently deleted and cannot be restored.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="destructive" 
                    onClick={deleteAccount}
                  >
                    Delete my account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default SettingsPage;
