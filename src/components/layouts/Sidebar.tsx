'use client';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
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
import { Button } from '../ui/button';
import { useLayoutEffect, useState } from 'react';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Accounts',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Batches',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Resolution',
    url: '#',
    icon: Search,
  },
  {
    title: 'Assesment',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Appeal Letter',
    url: '/appeal-letter',
    icon: Settings,
  },
  {
    title: 'Calender',
    url: '/calender',
    icon: Settings,
  },
];
interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any additional props here if needed
}

export function AppSidebar({ className, ...props }: AppSidebarProps) {
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
              <Button className="mt-4"> Logout </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
