
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/shared/loader/LoadingSkeleton';
import { Suspense } from 'react';
import AddUpdateAppealDialogWithRedux from '@/components/wrapped-with-redux/appeal/AddUpdateAppealDialogWithRedux';

const AppSidebar = dynamic(() => import('@/components/layouts/sidebar/Sidebar'), {
  suspense: true,
}as any);
const Header = dynamic(() => import('@/components/layouts/header/Header'), {
  suspense: true,
}as any);
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dashboard App | Events & CRUD Table',
    template: '%s | Dashboard App',
  },
  description:
    'A full-featured dashboard with calendar events and CRUD table functionality built using Next.js 15 and Redux.',
  keywords: ['Next.js', 'React', 'Dashboard', 'Calendar', 'CRUD', 'Tailwind CSS', 'Redux'],
  openGraph: {
    title: 'Dashboard App | Events & CRUD Table',
    description:
      'A professional-grade dashboard featuring calendar event management and a CRUD table, built with Next.js 15.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Dashboard App',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard App | Events & CRUD Table',
    description:
      'A professional-grade dashboard featuring calendar event management and a CRUD table.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
         
        <AddUpdateAppealDialogWithRedux/>
        <Toaster />

        <SidebarProvider>
          <div className="w-[100dvw] h-[100dvh] px-[1rem] pt-[0.5rem] bg-custom-main-background  ">


            {/* header content wraper */}
            <div className="w-full h-[9dvh] bg-white border border-gray-100 shadow rounded-lg ">
              {/* <Header /> */}
              <Suspense fallback={<LoadingSkeleton  className="w-full h-[9dvh]" spinerClassName='h-10 w-10'/>}>
                    <Header />
                </Suspense>
               
            </div>

            {/* sidebar & main content content wraper */}
            <div className="flex flex-1 h-[calc(91dvh-1rem)]  mt-[0.5rem] mb-[0.2rem] overflow-hidden gap-[1rem] ">

              <aside className="flex-shrink-0">
                <Suspense fallback={<LoadingSkeleton className="w-[240px] h-full" />}>
                    <AppSidebar className="h-[calc(91dvh-1rem)] !relative !inset-auto !z-auto " />
                </Suspense>
              </aside>

              <div className="flex-1 h-full overflow-hidden p-4 rounded-lg ">
               
                {children}
              </div>

            </div>


          </div>
        </SidebarProvider>

      </body>
    </html>
  );
}
