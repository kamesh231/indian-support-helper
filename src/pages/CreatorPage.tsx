
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Share2, Edit, MoreHorizontal, Check, X, Heart, Twitter, Facebook, Mail, QrCode, Coffee, EyeOff, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const CreatorPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [pageLink, setPageLink] = useState(`mochafan.com/${username || "yourusername"}`);
  const [isSupporter, setIsSupporter] = useState(false);
  const [supportAmount, setSupportAmount] = useState("");
  const [supporterName, setSupporterName] = useState("");
  const [supporterMessage, setSupporterMessage] = useState("");
  const [makeMonthly, setMakeMonthly] = useState(false);
  const [tipAnonymously, setTipAnonymously] = useState(false);
  const [creatorData, setCreatorData] = useState({
    name: "",
    username: username || "yourusername",
    avatar: "",
    coverPhoto: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop",
    description: "",
    supporters: 0,
    creatingText: "",
  });
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      setLoading(true);
      try {
        // First try to find by username
        let { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('username', username)
          .single();
          
        if (error || !data) {
          // If not found by username and we have a logged-in user, try to get their data
          if (user) {
            ({ data, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single());
          }
        }
        
        if (data) {
          setCreatorData({
            name: data.name || "",
            username: data.username || username || "yourusername",
            avatar: data.profile_pic || "",
            coverPhoto: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop",
            description: data.bio || "",
            supporters: data.supporter_count || 0,
            creatingText: data.creating_text || "",
          });
          
          setPageLink(`mochafan.com/${data.username || username || "yourusername"}`);
          
          // Fetch supporters for this creator
          const { data: supportersData, error: supportersError } = await supabase
            .from('tips')
            .select('*')
            .eq('creator_id', data.id)
            .limit(5);
            
          if (!supportersError && supportersData) {
            setSupporters(supportersData);
          }
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreatorData();
  }, [username, user]);

  const copyPageLink = () => {
    navigator.clipboard.writeText(`https://${pageLink}`);
    // Could add toast here
  };

  const handleSupport = () => {
    console.log("Supporting with amount:", supportAmount, "Anonymous:", tipAnonymously);
    // Implement actual support logic
    setShowThankYouDialog(true);
  };

  const handleEditPage = () => {
    navigate(`/creator/${creatorData.username}/edit`);
  };

  const downloadThankYouImage = () => {
    // In a real app, this would generate and download an image
    console.log("Downloading thank you image");
    // For now, just close the dialog
    setTimeout(() => {
      setShowThankYouDialog(false);
    }, 500);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(part => part[0]?.toUpperCase() || '').join('').substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={creatorData.avatar} />
              <AvatarFallback>{getInitials(creatorData.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{creatorData.name || "Creator"}</h2>
              <p className="text-sm text-muted-foreground">{creatorData.supporters} supporter{creatorData.supporters !== 1 ? 's' : ''}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="hidden md:flex">Home</Button>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowShareDialog(true)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              
              {user && (
                <Button 
                  variant="outline"
                  onClick={handleEditPage}
                >
                  Edit page
                </Button>
              )}
              
              <Button>+ Create</Button>
              
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                <AvatarFallback>{user ? getInitials(user.user_metadata?.name || "U") : "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div 
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${creatorData.coverPhoto})` }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 -mt-8">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">About {creatorData.name || "Creator"}</h3>
                {user && <Button variant="ghost" size="sm" onClick={handleEditPage}>Edit</Button>}
              </div>
              {creatorData.description ? (
                <p className="text-gray-700">{creatorData.description}</p>
              ) : (
                <p className="text-gray-500 italic">This creator hasn't added any information yet.</p>
              )}
              
              <div className="mt-4 flex items-center">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Heart className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Recent supporters</h3>
              {supporters && supporters.length > 0 ? (
                <div className="space-y-6">
                  {supporters.map((supporter, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12 bg-gray-100">
                        <AvatarFallback>
                          <Coffee className="h-6 w-6 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{supporter.anonymous ? "Anonymous" : "Someone"} became a supporter.</p>
                        <div className="flex items-center mt-1 space-x-4">
                          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">Reply</Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">Share</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No supporters yet. Be the first to support!</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Support {creatorData.name || "Creator"}</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center">
                    <Input 
                      type="text" 
                      placeholder="Enter amount" 
                      className="rounded-r-none"
                      value={supportAmount}
                      onChange={(e) => setSupportAmount(e.target.value)}
                      prefix="$"
                    />
                    <div className="flex divide-x border border-l-0 rounded-r-md overflow-hidden">
                      <Button variant="custom" className="rounded-none px-2 py-1 h-10 bg-gray-50 hover:bg-gray-100">+100</Button>
                      <Button variant="custom" className="rounded-none px-2 py-1 h-10 bg-gray-50 hover:bg-gray-100">+200</Button>
                      <Button variant="custom" className="rounded-none px-2 py-1 h-10 bg-gray-50 hover:bg-gray-100">+500</Button>
                    </div>
                  </div>
                  <div className="flex divide-x border border-t-0 rounded-b-md overflow-hidden mt-px">
                    <Button 
                      variant="custom" 
                      className="flex-1 rounded-none px-2 py-1 h-10 bg-gray-50 hover:bg-gray-100"
                      onClick={() => setSupportAmount((prev) => (Number(prev) + 1000).toString())}
                    >
                      +1000
                    </Button>
                    <Button 
                      variant="custom" 
                      className="flex-1 rounded-none px-2 py-1 h-10 bg-gray-50 hover:bg-gray-100"
                      onClick={() => setSupportAmount((prev) => (Number(prev) + 2000).toString())}
                    >
                      +2000
                    </Button>
                  </div>
                </div>
                
                <Input 
                  placeholder="Name or @yoursocial" 
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  disabled={tipAnonymously}
                />
                
                <Textarea 
                  placeholder="Say something nice..." 
                  className="min-h-24"
                  value={supporterMessage}
                  onChange={(e) => setSupporterMessage(e.target.value)}
                />
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="make-monthly" 
                      checked={makeMonthly}
                      onCheckedChange={setMakeMonthly}
                    />
                    <Label htmlFor="make-monthly">Make this monthly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="tip-anonymously" 
                      checked={tipAnonymously}
                      onCheckedChange={(checked) => {
                        setTipAnonymously(checked);
                        if (checked) {
                          setSupporterName("");
                        }
                      }}
                    />
                    <Label htmlFor="tip-anonymously" className="flex items-center gap-1">
                      <EyeOff className="h-3.5 w-3.5" />
                      Tip anonymously
                    </Label>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSupport}
                >
                  Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogTitle className="text-center">Share {creatorData.name || "Creator"}'s page</DialogTitle>
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
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0zM13 7.36h-1.43v6.59H13V7.36zm4.51 2.9v3.7h-1.44v-3.48c0-.6-.23-.9-.68-.9a.77.77 0 0 0-.7.49c-.04.09-.05.21-.05.33v3.55H13.2s.02-5.76 0-6.35h1.44v.9l-.01.02h.01v-.02a1.54 1.54 0 0 1 1.31-.73c.47 0 .85.14 1.12.42.31.36.47.85.47 1.47z" />
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

      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent className="max-w-md">
          <DialogTitle className="text-center">Thank You for Your Support!</DialogTitle>
          <div className="py-6">
            <div className="bg-gradient-to-r from-primary/20 to-secondary p-6 rounded-lg text-center space-y-3">
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-bold">You just supported {creatorData.name || "Creator"}</h3>
              <p className="text-lg">With ₹{supportAmount || "100"}</p>
              {!tipAnonymously && supporterName && (
                <p className="text-sm text-gray-600">From: {supporterName}</p>
              )}
              {tipAnonymously && (
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <EyeOff className="h-3 w-3" /> Anonymous support
                </p>
              )}
            </div>
            
            <div className="flex justify-center mt-6 space-x-3">
              <Button variant="outline" className="gap-2" onClick={downloadThankYouImage}>
                <Download className="h-4 w-4" />
                Download Image
              </Button>
              <Button className="gap-2" onClick={() => {
                setShowShareDialog(true);
                setShowThankYouDialog(false);
              }}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorPage;
