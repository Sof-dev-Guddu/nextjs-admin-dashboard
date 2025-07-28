"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DummyPage() {
  const path=usePathname()
 const segments = path.split("/").filter(Boolean); 
const pageNumber = segments[segments.length - 1]; 
  
  return (
    <main >
      <h1  className='text-gray-800 ml-1'><span className='border-b-4 border-b-primary pb-1'>Its A Dummy Page-{pageNumber}</span></h1>

       <section className="max-h-[80dvh] mt-2 p-6 overflow-auto bg-white rounded-lg  ">
        <ol className="list-decimal list-inside space-y-4">
        <li>
          <div className='flex space-x-4'>
            <div>
           <p>For CRUD table click</p>
        <Link
          href="/appeal-letter"
          className="text-blue-600 font-semibold underline hover:text-blue-800"
        >
           appeal-letter
        </Link>
         </div>
         <div>
          <Image
                    src="/assets/images/table.png"
                    alt="Company Logo"
                    width={550}
                    height={150}
                    priority
          />
         </div>


          </div>
         
        </li>
        <li>
            <div className='flex space-x-4'>
            <div>
            <p>For Calendar Events click</p>
        <Link
          href="/calendar"
          className="text-blue-600 font-semibold underline hover:text-blue-800"
        >
          calendar
        </Link>
         </div>
         <div>
          <Image
                    src="/assets/images/calendar.png"
                    alt="Company Logo"
                    width={550}
                    height={150}
                    priority
          />
         </div>


          </div>
         
        </li>
        <li>
          <p>OR</p>
        <Link
          href="/"
          className="text-yellow-600 underline hover:text-yellow-800"
        >
          Go back to Home
        </Link>
        </li>
      </ol>
       </section>
    </main>
  );
}
