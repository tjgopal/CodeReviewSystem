import { ExtendedUSer } from "@/next-auth";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUSer;
  label: string;
}
const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div>
      <Card className="w-[600px] shadow-md">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">{label}</p>
        </CardHeader>
        <CardContent className="spaye-y-4 ">
          <div className="flex flex-row items-center justify-between p-2 rounded-xl shadow-sm">
            <p className="text-sm font-medium">ID</p>
            <p className="truncate  text-xs max-w-[190px] p-1 bg-slate-50 rounded-md">
              {user.id}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-xl shadow-sm">
            <p className="text-sm font-medium">Name</p>
            <p className="truncate  text-xs max-w-[190px] p-1 bg-slate-50 rounded-md">
              {user?.name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-xl shadow-sm">
            <p className="text-sm font-medium">Email</p>
            <p className="truncate  text-xs max-w-[190px] p-1 bg-slate-50 rounded-md">
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-xl shadow-sm">
            <p className="text-sm font-medium">Role</p>
            <p className="truncate  text-xs max-w-[190px] p-1 bg-slate-50 rounded-md">
              {user?.role}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-xl shadow-sm">
            <p className="text-sm font-medium">2 FA Authentication</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "On" : "OFF"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;
