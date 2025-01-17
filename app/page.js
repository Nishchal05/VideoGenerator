"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); 
    }
  }, [isSignedIn, router]); 
  return (
    <div>
      <UserButton />
     
    </div>
  );
}
