import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Home | Event & CRUD Manager',
  description:
    'Landing page for the dashboard app. Access the CRUD table and calendar event manager.',
  keywords: ['dashboard', 'landing page', 'CRUD app', 'calendar event', 'Next.js', 'React'],
  openGraph: {
    title: 'Dashboard Home',
    description: 'Navigate to calendar or CRUD table from the dashboard.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    siteName: 'Dashboard Demo',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dashboard Home - React + Next.js',
    description: 'Landing page linking to calendar and table functionality.',
  },
};
export default function Home() {
  return (
    <main className="w-full h-full overflow-x-auto p-6 flex flex-col justify-center items-center">
      <h1 className="text-[5rem] bg-primary text-white shadow w-full text-center">
        Main Dashboard Content
      </h1>
      <div className="space-x-8 mt-12 underline text-blue-900 font-semibold">
        <Link className="hover:text-blue-700" href={"/appeal-letter"}>Click here for CRUD table page</Link>
        <Link className="hover:text-blue-700" href={"/calendar"}>Click here for Calendar Events page</Link>
      </div>
    </main>
  );
}
