
import { useState } from "react";
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
  
  const supporters = [
    {
      id: 1,
      name: "Someone",
      email: "venkata.motamarry@gmail.com",
      amount: "₹500.00",
      date: "1 week ago",
      avatar: "/public/lovable-uploads/023184f5-c2e9-4e5d-a8ba-421cdff66caf.png",
    },
    {
      id: 2,
      name: "Someone",
      email: "venkata.motamarry@gmail.com",
      amount: "₹100.00",
      date: "1 week ago",
      avatar: "/public/lovable-uploads/023184f5-c2e9-4e5d-a8ba-421cdff66caf.png",
    },
  ];

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
                    <span className="text-4xl font-bold">1</span>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" /> Supporters
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-bold">₹7</span>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" /> Last 30 days
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-bold">₹7</span>
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
                      {supporters.map((supporter) => (
                        <TableRow key={supporter.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={supporter.avatar} alt={supporter.name} />
                                <AvatarFallback>S</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{supporter.name}</div>
                                <div className="text-sm text-muted-foreground">{supporter.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">{supporter.amount}</TableCell>
                          <TableCell className="text-right text-muted-foreground">{supporter.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
