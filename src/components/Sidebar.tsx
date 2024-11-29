import { useNavigate } from "react-router-dom";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User, LogIn, Home, Image, Settings } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const isLoggedIn = false; // TODO: Replace with actual auth state

  const menuItems = [
    {
      title: "Home",
      icon: Home,
      url: "/",
    },
    {
      title: "Galleries",
      icon: Image,
      url: "/galleries",
    },
    {
      title: isLoggedIn ? "My Account" : "Login",
      icon: isLoggedIn ? User : LogIn,
      url: isLoggedIn ? "/account" : "/login",
    },
    ...(isLoggedIn
      ? [
          {
            title: "Settings",
            icon: Settings,
            url: "/settings",
          },
        ]
      : []),
  ];

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}