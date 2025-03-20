
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Calendar, Clock, MoreHorizontal, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DashboardHome = () => {
  const [timeframe, setTimeframe] = useState("30days");
  const [recentSupporters, setRecentSupporters] = useState([]);
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
        
        setRecentSupporters(tipsData || []);
        setTotalEarnings(userData?.total_tips || 0);
        setSupportersCount(tipsData?.length || 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Creator" />
              <AvatarFallback>
                {user?.user_metadata?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Hi, {user?.user_metadata?.name || 'Creator'}
              </h1>
              <p className="text-muted-foreground">
                pledgepe.com/{user?.user_metadata?.name?.toLowerCase() || 'yourcreatorname'}
              </p>
            </div>
          </div>
          <Button className="md:w-auto w-full">
            <Share2 className="mr-2 h-4 w-4" /> Share page
          </Button>
        </div>

        {/* Earnings section */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold">Earnings</CardTitle>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-white border rounded-md px-3 py-1 text-sm"
              >
                <option value="30days">Last 30 days</option>
                <option value="7days">Last 7 days</option>
                <option value="year">Last year</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pt-4">
              <h2 className="text-4xl font-bold">₹{totalEarnings}</h2>
              <div className="mt-4 flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-200"></span>
                  <span>₹{totalEarnings} Supporters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-pink-200"></span>
                  <span>₹0 Membership</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-200"></span>
                  <span>₹0 Shop</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <h2 className="text-xl font-semibold">Recent</h2>
          </div>
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <Table>
                <TableBody>
                  {recentSupporters.length > 0 ? (
                    recentSupporters.map((supporter, index) => (
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
