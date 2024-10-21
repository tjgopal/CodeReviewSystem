"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseCurrentUSer } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./logout-button";
import { ExitIcon } from "@radix-ui/react-icons";

const UserButton = () => {
  const user = UseCurrentUSer();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 " align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
