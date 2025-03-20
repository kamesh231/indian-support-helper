
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, IndianRupee } from "lucide-react";

const PayoutsPage = () => {
  const outstandingBalance = "₹428.64";
  
  // Sample payout history data with INR currency
  const payoutHistory = [
    { id: 1, date: "14 January 2024", amount: "₹2,180", status: "COMPLETED" },
    { id: 2, date: "14 December 2023", amount: "₹2,180", status: "COMPLETED" },
    { id: 3, date: "14 November 2023", amount: "₹1,840", status: "COMPLETED" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Payout</h1>
        
        {/* Outstanding Balance Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">OUTSTANDING BALANCE</p>
                <h2 className="text-4xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1 text-muted-foreground" />
                  <span>{outstandingBalance.replace('₹', '')}</span>
                </h2>
              </div>
              <div className="flex gap-2">
                <Button className="rounded-full bg-black text-white hover:bg-black/90">
                  Finish Onboarding
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0">
                    <Button variant="ghost" className="w-full justify-start rounded-none p-3 font-normal">
                      Disconnect
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payout History Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Payout history</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground font-medium">DATE</TableHead>
                  <TableHead className="text-muted-foreground font-medium">AMOUNT</TableHead>
                  <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.length > 0 ? (
                  payoutHistory.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                        {payout.amount.replace('₹', '')}
                      </TableCell>
                      <TableCell className="text-amber-500">
                        {payout.status}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2 bg-amber-50 p-4 rounded-lg">
                        <div className="bg-amber-100 p-2 rounded-md">
                          <span className="text-amber-500 text-xl">💰</span>
                        </div>
                        <p>You haven't received any payouts so far.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PayoutsPage;
