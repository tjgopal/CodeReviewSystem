import UserInfo from "@/components/user-info";
import { currentData } from "@/lib/auth";
import React from "react";

const ServerPage = async () => {
  const user = await currentData();
  return <UserInfo user={user} label="Server Component 💻" />;
};

export default ServerPage;
