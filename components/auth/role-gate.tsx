"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";

interface roleGateProps {
  children: React.ReactNode;
  userrole: UserRole;
}
const RoleGate = ({ children, userrole }: roleGateProps) => {
  const role = useCurrentRole();
  if (role !== userrole) {
    return <FormError message="You don have permission to see it "></FormError>;
  }
  return <>{children}</>;
  return <div></div>;
};

export default RoleGate;
