
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, IndianRupee, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PayoutsPage = () => {
  const { user } = useAuth();
  const [outstandingBalance, setOutstandingBalance] = useState("₹0");
  const [minimumPayout] = useState("₹1000");
  const [kycVerified, setKycVerified] = useState(false);
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [showRequestPayoutDialog, setShowRequestPayoutDialog] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Get user profile for KYC status and balance
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('total_tips, kyc_completed, bank_account, ifsc_code')
          .eq('id', user.id)
          .single();
          
        if (userError) throw userError;
        
        // Get payout history
        const { data: payoutData, error: payoutError } = await supabase
          .from('payout_requests')
          .select('*')
          .eq('creator_id', user.id);
          
        if (payoutError) throw payoutError;
        
        setOutstandingBalance(`₹${userData?.total_tips || 0}`);
        setKycVerified(userData?.kyc_completed || false);
        setAccountNumber(userData?.bank_account || "");
        setIfscCode(userData?.ifsc_code || "");
        setPayoutHistory(payoutData || []);
      } catch (error) {
        console.error("Error fetching payout data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  const handleRequestPayout = () => {
    if (!kycVerified) {
      setShowKycDialog(true);
      return;
    }
    
    const balance = parseFloat(outstandingBalance.replace('₹', '').replace(',', ''));
    const minimum = parseFloat(minimumPayout.replace('₹', '').replace(',', ''));
    
    if (balance < minimum) {
      toast.error(`Minimum payout amount is ${minimumPayout}`);
      return;
    }
    
    setShowRequestPayoutDialog(true);
  };
  
  const submitKyc = async () => {
    if (!panNumber || !accountNumber || !ifscCode || !accountName) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          kyc_completed: true,
          bank_account: accountNumber,
          ifsc_code: ifscCode
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success("KYC verification initiated. We'll review your details shortly.");
      setKycVerified(true);
      setShowKycDialog(false);
      
      // After KYC verification, show the payout dialog
      setTimeout(() => {
        setShowRequestPayoutDialog(true);
      }, 500);
    } catch (error) {
      console.error("Error updating KYC status:", error);
      toast.error("Failed to submit KYC details. Please try again.");
    }
  };
  
  const confirmPayout = async () => {
    try {
      const amountRequested = parseFloat(outstandingBalance.replace('₹', '').replace(',', ''));
      
      // Call the request_payout function
      const { data, error } = await supabase.rpc(
        'request_payout',
        { 
          p_creator_id: user.id, 
          p_amount: amountRequested 
        }
      );
      
      if (error) throw error;
      
      // Update the local state
      const newPayout = {
        id: data,
        date: new Date().toLocaleDateString(),
        amount: outstandingBalance,
        status: 'PENDING'
      };
      
      setPayoutHistory([newPayout, ...payoutHistory]);
      setOutstandingBalance("₹0");
      
      toast.success("Payout request submitted successfully!");
      setShowRequestPayoutDialog(false);
    } catch (error) {
      console.error("Error requesting payout:", error);
      toast.error(error.message || "Failed to request payout. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Payout</h1>
        
        {/* KYC Status Card */}
        {!kycVerified && (
          <Alert variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>KYC Verification Required</AlertTitle>
            <AlertDescription>
              Complete your KYC verification to request payouts. We need your PAN card and bank account details.
            </AlertDescription>
          </Alert>
        )}
        
        {kycVerified && (
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
            <ShieldCheck className="h-5 w-5" />
            <AlertTitle>KYC Verified</AlertTitle>
            <AlertDescription>
              Your account is verified and ready to receive payouts.
            </AlertDescription>
          </Alert>
        )}
        
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
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum payout amount: {minimumPayout}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="rounded-full bg-black text-white hover:bg-black/90"
                  onClick={handleRequestPayout}
                >
                  Request Payout
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
                      <TableCell>
                        {new Date(payout.created_at).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                        {payout.amount_requested}
                      </TableCell>
                      <TableCell className="text-amber-500">
                        {payout.status.toUpperCase()}
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
      
      {/* KYC Dialog */}
      <Dialog open={showKycDialog} onOpenChange={setShowKycDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification</DialogTitle>
            <DialogDescription>
              Complete your KYC verification to request payouts. This is required by regulations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card Number*</Label>
              <Input 
                id="pan" 
                placeholder="ABCDE1234F" 
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-name">Account Holder Name*</Label>
              <Input 
                id="account-name" 
                placeholder="Full name as per bank records" 
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account">Bank Account Number*</Label>
              <Input 
                id="account" 
                placeholder="Your bank account number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code*</Label>
              <Input 
                id="ifsc" 
                placeholder="SBIN0000123" 
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKycDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitKyc}>
              Submit Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Request Payout Dialog */}
      <Dialog open={showRequestPayoutDialog} onOpenChange={setShowRequestPayoutDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
            <DialogDescription>
              Your payout will be processed within 24-48 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-secondary p-4 rounded-lg">
              <p className="font-medium">Amount to be paid out:</p>
              <p className="text-2xl font-bold flex items-center mt-1">
                <IndianRupee className="h-4 w-4 mr-1" />
                {outstandingBalance.replace('₹', '')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Will be transferred to bank account ending with {accountNumber.slice(-4) || "****"}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestPayoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPayout}>
              Confirm Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PayoutsPage;
