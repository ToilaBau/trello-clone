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
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { sidebarNavLinks } from '@/config/navlink.config';
import { Link } from '@tanstack/react-router';
import { Kanban, Settings } from 'lucide-react';

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex-1 bg-sidebar">
        <SidebarHeader className="border-b border-sidebar-border bg-sidebar relative">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full h-full">
                <Kanban className="stroke-3" />
                <div className="font-bold text-lg">
                  Tasker <span className="text-accent">B</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarNavLinks.map((navlink) => {
                return (
                  <SidebarMenuItem key={navlink.href}>
                    <SidebarMenuButton asChild>
                      <Link to={navlink.href}>
                        <navlink.icon />
                        <span>{navlink.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="bg-gray-100">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={'/setting'}>
              <Settings className="size-6" />
              <span>Cài Đặt</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
