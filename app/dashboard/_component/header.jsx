"use client";
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className='flex justify-between items-center min-h-4 p-3'>
      {path.startsWith('/editor') || path.startsWith('/ai-video-gen') ? (
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <img
            src="/VideoGeneratorLogo.png"
            alt="Video Generator Logo"
            width={40}
            className="w-10 md:w-14"
          />
          <h2 className="font-medium text-md md:text-lg">Video Generator</h2>
        </div>
      ) : null}
      <div className="flex gap-5 items-center shadow-none">
        <div className="mr-3">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
