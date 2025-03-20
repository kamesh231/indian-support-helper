
import { Link } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Coffee, 
  Home, 
  ExternalLink, 
  Compass, 
  Heart, 
  UserPlus, 
  ShoppingCart, 
  Upload, 
  LayoutTemplate, 
  Link as LinkIcon, 
  IndianRupee, 
  Settings,
  LogOut
} from "lucide-react";

const DashboardSidebar = () => {
  const isCurrentPath = (path: string) => window.location.pathname === path;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">MochaFan</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={isCurrentPath("/dashboard")}>
                  <Link to="/dashboard">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="View page" isActive={isCurrentPath("/creator/yourusername")}>
                  <Link to="/creator/yourusername" target="_blank">
                    <ExternalLink />
                    <span>View page</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Explore creators" isActive={isCurrentPath("/creators")}>
                  <Link to="/creators">
                    <Compass />
                    <span>Explore creators</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Monetize Section */}
        <SidebarGroup>
          <SidebarGroupLabel>MONETIZE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Supporters" isActive={isCurrentPath("/dashboard/supporters")}>
                  <Link to="/dashboard/supporters">
                    <Heart />
                    <span>Supporters</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Memberships" isActive={isCurrentPath("/dashboard/memberships")}>
                  <Link to="/dashboard/memberships">
                    <UserPlus />
                    <span>Memberships</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Shop" isActive={isCurrentPath("/dashboard/shop")}>
                  <Link to="/dashboard/shop">
                    <ShoppingCart />
                    <span>Shop</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Publish" isActive={isCurrentPath("/dashboard/publish")}>
                  <Link to="/dashboard/publish">
                    <Upload />
                    <span>Publish</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Buttons & Graphics" isActive={isCurrentPath("/dashboard/buttons-graphics")}>
                  <Link to="/dashboard/buttons-graphics">
                    <LayoutTemplate />
                    <span>Buttons & Graphics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Integrations" isActive={isCurrentPath("/dashboard/integrations")}>
                  <Link to="/dashboard/integrations">
                    <LinkIcon />
                    <span>Integrations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Payouts" isActive={isCurrentPath("/dashboard/payouts")}>
                  <Link to="/dashboard/payouts">
                    <IndianRupee />
                    <span>Payouts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" isActive={isCurrentPath("/dashboard/settings")}>
                  <Link to="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-3">
        <Link to="/logout">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
