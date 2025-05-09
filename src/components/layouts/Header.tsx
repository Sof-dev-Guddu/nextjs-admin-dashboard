import Image from 'next/image';
import Link from 'next/link';

import ClientWorkspace from './ClientWorkspace';

import { Bell, Grip } from 'lucide-react';
import CustomInput from '../shared/CustomInput';
import CustomAvatar from '../shared/CustomAvatar';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2  bg-white rounded-lg">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="Company Logo"
            width={150}
            height={24}
            priority
          />
        </Link>
      </div>

      {/* Right: All other content */}
      <div className="flex items-center gap-6">
        {/* Workspace Selector */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Client Workspace:
          </h3>
          <ClientWorkspace />
        </div>

        {/* Search Input */}
        <CustomInput />

        {/* Avatars & Bell */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
            <CustomAvatar
              className="w-8 h-8"
              imageSrc="/assets/icons/workspace.png"
              fallback="WS"
            />
            <CustomAvatar
              className="w-8 h-8"
              fallbackClassName="bg-[#69ABEF] text-white"
              imageSrc=""
              fallback="AK"
            />
          </div>

          <div className="border-r border-gray-300 px-6 h-8 flex items-center justify-center">
            <Bell className="text-gray-600" />
          </div>
          <div className="px-4">
            <Grip className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
