"use client";
import UserInfo from "@/components/user-info";
import { UseCurrentUSer } from "@/hooks/use-current-user";

import React from "react";

const ClientPage = () => {
  const user = UseCurrentUSer();
  return <UserInfo user={user} label="Client Component 👦🏻" />;
};

export default ClientPage;
