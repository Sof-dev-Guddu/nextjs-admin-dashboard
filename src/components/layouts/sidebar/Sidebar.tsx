'use client';
import {  Activity, Calendar1, Home, Inbox, LogOut, Search, Settings, Table } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '../../ui/button';


// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Dummy1',
    url: '/dummy-page/1',
    icon: Inbox,
  },
  {
    title: 'Dummy2',
    url: '/dummy-page/2',
    icon: Activity,
  },
  {
    title: 'dummy3',
    url: '/dummy-page/3',
    icon: Search,
  },
  {
    title: 'Dummy4',
    url: '/dummy-page/4',
    icon: Settings,
  },
  {
    title: 'Appeal Letter',
    url: '/appeal-letter',
    icon: Table,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar1 ,
  },
];
 interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // any additional props here if needed
}

function AppSidebar({ className, ...props }: AppSidebarProps) {
const {state}=useSidebar()
console.log("sidebar",state)
  return (
    <Sidebar
      collapsible="icon"
      className={cn('rounded-lg  ', className)}
      {...props}
    >
      <SidebarTrigger className="absolute -right-[14px] top-[0.4rem]" />
      <SidebarContent className=" text-white  flex justify-between   ">
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center items-center">
            <SidebarMenu className="w-[80%]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center items-center ">
            <SidebarMenu className="w-[80%]">
              <SidebarMenuItem key="Setting">
                <SidebarMenuButton asChild>
                  <Link href="/setting">
                    <Settings />
                    <span>Setting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Button className="mt-4">
                 <LogOut />
                {state === "expanded" && "Logout"}
              
                 </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar