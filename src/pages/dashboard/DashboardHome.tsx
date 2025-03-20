
import { useState } from "react";
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
  
  const recentSupporters = [
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
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Creator" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Hi, Kamesh</h1>
              <p className="text-muted-foreground">pledgepe.com/kamesh231</p>
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
              <h2 className="text-4xl font-bold">₹7</h2>
              <div className="mt-4 flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-200"></span>
                  <span>₹7 Supporters</span>
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
            <h2 className="text-xl font-semibold">Recent</h2>
          </div>
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <Table>
                <TableBody>
                  {recentSupporters.map((supporter) => (
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
