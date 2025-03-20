
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Calendar, Clock, MoreHorizontal, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SupportersPage = () => {
  const [activeTab, setActiveTab] = useState("one-time");
  const [supporters, setSupporters] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [supportersCount, setSupportersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Get user's tips
        const { data: tipsData, error: tipsError } = await supabase
          .from('tips')
          .select('*')
          .eq('creator_id', user.id);
          
        if (tipsError) throw tipsError;
        
        // Get user profile for total_tips
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('total_tips')
          .eq('id', user.id)
          .single();
          
        if (userError) throw userError;
        
        setSupporters(tipsData || []);
        setTotalEarnings(userData?.total_tips || 0);
        setSupportersCount(tipsData?.length || 0);
      } catch (error) {
        console.error("Error fetching supporters data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Supporters</h1>
        
        <Tabs defaultValue="one-time" className="w-full">
          <TabsList className="mb-6 border-b rounded-none w-full justify-start h-auto bg-transparent p-0 space-x-8">
            <TabsTrigger 
              value="one-time" 
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              One-time
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-3"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="one-time">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-bold">{supportersCount}</span>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" /> Supporters
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-bold">₹{totalEarnings}</span>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Last 30 days
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-bold">₹{totalEarnings}</span>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" /> All-time
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent transactions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent transactions</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search by name or email"
                      className="pl-10 w-[240px] rounded-full bg-slate-100 border-0"
                    />
                  </div>
                  <Button variant="outline" className="rounded-full gap-2">
                    <Download className="h-4 w-4" />
                    .CSV
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border">
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {supporters.length > 0 ? (
                        supporters.map((supporter, index) => (
                          <TableRow key={supporter.id || index}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src="/placeholder.svg" alt="Supporter" />
                                  <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {supporter.anonymous ? 'Anonymous' : 'Someone'}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {supporter.anonymous ? 'Anonymous' : 'anonymous@mail.com'}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">₹{supporter.amount}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {new Date(supporter.timestamp).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                              <Heart className="h-10 w-10 text-muted-foreground/40" />
                              <p className="text-muted-foreground">No supporters yet</p>
                              <p className="text-sm text-muted-foreground/60">Share your page to start receiving support</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Supporter Settings</h3>
                <p className="text-muted-foreground">Configure how supporters can interact with your page.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupportersPage;
