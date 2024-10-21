import { logOut } from "@/actions/logout";
import React from "react";
interface LogoutChildren {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutChildren) => {
  const onclick = () => {
    logOut();
  };
  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
