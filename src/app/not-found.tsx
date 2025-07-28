

import { Frown } from 'lucide-react';
import Link from 'next/link';


export default function NotFound() {
  return (
    <div className="flex flex-col items-center  min-h-screen text-center p-4 bg-white rounded-lg text-gray-700">
       <Frown className="w-[200px] h-[200px] " />
      <h1 className="text-4xl font-bold mb-4"> <span className='text-6xl'>404</span> - Page Not Found</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
