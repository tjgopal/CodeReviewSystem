"use client";
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center  rounded-xl w-[800px] text-black p-4 shadow-xl">
      <div className="flex gap-x-2">
        {/* <Button asChild variant={pathname == "/server" ? "default" : "outline"}> */}
        {/* as child helps in behaving like component rather than like button */}
        {/* <Link href="/server"> server </Link> */}
        {/* </Button> */}
        {/* <Button asChild variant={pathname == "/client" ? "default" : "outline"}> */}
        {/* as child helps in behaving like component rather than like button */}
        {/* <Link href="/client"> client </Link> */}
        {/* </Button>
        <Button asChild variant={pathname == "/admin" ? "default" : "outline"}> */}
        {/* as child helps in behaving like component rather than like button */}
        {/* <Link href="/admin"> Admin </Link>
        </Button> */}
        <Button
          asChild
          variant={pathname == "/settings" ? "default" : "outline"}
        >
          {/* as child helps in behaving like component rather than like button */}
          <Link href="/settings"> Code Reviewer </Link>
        </Button>
      </div>
      <p>
        <UserButton />
      </p>
    </div>
  );
};

export default Navbar;
