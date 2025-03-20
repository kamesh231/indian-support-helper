import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, X, Coffee, Beer, Pizza, BookText, Bookmark, Heart, ShoppingBag, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const EditCreatorPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile data with empty initial values
  const [name, setName] = useState("");
  const [creatingText, setCreatingText] = useState("");
  const [about, setAbout] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [pageIcon, setPageIcon] = useState("coffee");
  const [iconText, setIconText] = useState("coffee");
  const [themeColor, setThemeColor] = useState("#5F7FFF");
  const [showSupporterCount, setShowSupporterCount] = useState(true);
  
  // Sidebar arrangement
  const [sidebarItems, setSidebarItems] = useState([
    { id: 1, name: "Support", description: "One-time contributions from your fans", active: true },
    { id: 2, name: "Membership", description: "Recurring support for exclusive benefits", active: false },
    { id: 3, name: "Shop", description: "Sell your merchandise and creations", active: false },
  ]);

  // Fetch creator data if editing existing profile
  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setName(data.name || "");
          setCreatingText("");
          setAbout(data.bio || "");
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
      }
    };
    
    fetchCreatorData();
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      if (!user) {
        toast.error("You must be logged in to save your profile");
        setIsSaving(false);
        return;
      }
      
      const { error } = await supabase
        .from('users')
        .update({
          name,
          bio: about,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success("Changes saved successfully");
      navigate(`/creator/${username || user.id}`);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/creator/${username || "yourusername"}`);
  };

  const iconOptions = [
    { value: "coffee", label: "Coffee", icon: <Coffee className="h-5 w-5" /> },
    { value: "beer", label: "Beer", icon: <Beer className="h-5 w-5" /> },
    { value: "pizza", label: "Pizza", icon: <Pizza className="h-5 w-5" /> },
    { value: "book", label: "Book", icon: <BookText className="h-5 w-5" /> },
  ];
  
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "coffee": return <Coffee className="h-5 w-5" />;
      case "beer": return <Beer className="h-5 w-5" />;
      case "pizza": return <Pizza className="h-5 w-5" />;
      case "book": return <BookText className="h-5 w-5" />;
      default: return <Coffee className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Edit Page</h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
            <TabsTrigger value="sidebar" className="flex-1">Sidebar</TabsTrigger>
            <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          </TabsList>

          <div className="space-y-8">
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Profile photo</h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{name ? name.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="h-10">Upload</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="full-name">Full name</Label>
                  <Input 
                    id="full-name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="mt-1"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="creator-content">What are you creating?</Label>
                  <Input 
                    id="creator-content"
                    placeholder="I make videos about tech, share travel photos..."
                    className="mt-1"
                    value={creatingText}
                    onChange={(e) => setCreatingText(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Replace "coffee" with anything you like</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="border rounded-md p-2 w-16 flex items-center justify-center">
                      {getIconComponent(pageIcon)}
                    </div>
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Input 
                    value={iconText}
                    onChange={(e) => setIconText(e.target.value)}
                    className="flex-1"
                    placeholder="coffee, beer, etc."
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {iconOptions.map((option) => (
                    <Button 
                      key={option.value}
                      variant={pageIcon === option.value ? "default" : "outline"}
                      className="flex items-center space-x-2 rounded-full"
                      onClick={() => {
                        setPageIcon(option.value);
                        setIconText(option.label.toLowerCase());
                      }}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Theme color</h2>
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-12 w-12 rounded-md border"
                    style={{ backgroundColor: themeColor }}
                  />
                  <Input 
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    placeholder="#5F7FFF"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Display supporter count</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="display-supporters" className="cursor-pointer">
                    Show how many people support you
                  </Label>
                  <Switch 
                    id="display-supporters" 
                    checked={showSupporterCount}
                    onCheckedChange={setShowSupporterCount}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Social sharing</h2>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Bookmark className="h-5 w-5 text-gray-500" />
                  <Input
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Your website or social media link"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="mt-2">+ Add social link</Button>
              </div>
            </TabsContent>

            {/* Sidebar Tab */}
            <TabsContent value="sidebar" className="space-y-6">
              <h2 className="text-lg font-medium">Arrange your sidebar</h2>
              <div className="space-y-3">
                {sidebarItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-4 border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-center p-1 cursor-move">
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 4.625C5.5 4.97018 5.22018 5.25 4.875 5.25C4.52982 5.25 4.25 4.97018 4.25 4.625C4.25 4.27982 4.52982 4 4.875 4C5.22018 4 5.5 4.27982 5.5 4.625ZM5.5 7.625C5.5 7.97018 5.22018 8.25 4.875 8.25C4.52982 8.25 4.25 7.97018 4.25 7.625C4.25 7.27982 4.52982 7 4.875 7C5.22018 7 5.5 7.27982 5.5 7.625ZM4.875 11.25C5.22018 11.25 5.5 10.9702 5.5 10.625C5.5 10.2798 5.22018 10 4.875 10C4.52982 10 4.25 10.2798 4.25 10.625C4.25 10.9702 4.52982 11.25 4.875 11.25ZM8.5 4.625C8.5 4.97018 8.22018 5.25 7.875 5.25C7.52982 5.25 7.25 4.97018 7.25 4.625C7.25 4.27982 7.52982 4 7.875 4C8.22018 4 8.5 4.27982 8.5 4.625ZM7.875 8.25C8.22018 8.25 8.5 7.97018 8.5 7.625C8.5 7.27982 8.22018 7 7.875 7C7.52982 7 7.25 7.27982 7.25 7.625C7.25 7.97018 7.52982 8.25 7.875 8.25ZM8.5 10.625C8.5 10.9702 8.22018 11.25 7.875 11.25C7.52982 11.25 7.25 10.9702 7.25 10.625C7.25 10.2798 7.52982 10 7.875 10C8.22018 10 8.5 10.2798 8.5 10.625ZM10.875 5.25C11.2202 5.25 11.5 4.97018 11.5 4.625C11.5 4.27982 11.2202 4 10.875 4C10.5298 4 10.25 4.27982 10.25 4.625C10.25 4.97018 10.5298 5.25 10.875 5.25ZM11.5 7.625C11.5 7.97018 11.2202 8.25 10.875 8.25C10.5298 8.25 10.25 7.97018 10.25 7.625C10.25 7.27982 10.5298 7 10.875 7C11.2202 7 11.5 7.27982 11.5 7.625ZM10.875 11.25C11.2202 11.25 11.5 10.9702 11.5 10.625C11.5 10.2798 11.2202 10 10.875 10C10.5298 10 10.25 10.2798 10.25 10.625C10.25 10.9702 10.5298 11.25 10.875 11.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {item.id === 1 ? (
                          <Heart className="h-5 w-5 text-gray-600" />
                        ) : item.id === 2 ? (
                          <Bookmark className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ShoppingBag className="h-5 w-5 text-gray-600" />
                        )}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    {item.id !== 1 && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    {item.id !== 1 && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">About me</h2>
                <Textarea 
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="min-h-32"
                  placeholder="Tell your supporters about yourself and what you create..."
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Featured video</h2>
                <Input 
                  placeholder="Paste your YouTube or Vimeo link here"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EditCreatorPage;
