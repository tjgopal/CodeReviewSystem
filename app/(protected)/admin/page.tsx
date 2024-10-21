"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { FormSucess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Api route");
      } else {
        toast.success("Forbidden Api route");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-semibold items-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate userrole={UserRole.ADMIN}>
          <FormSucess message="This is only used by admins"></FormSucess>
        </RoleGate>
        <div className="flex flex-rol items-center justify-between rounded-lg border p-4  shadow-md">
          <p className="text-sm font-medium">Admin Api routes</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-rol items-center justify-between rounded-lg border p-4  shadow-md">
          <p className="text-sm font-medium">Admin only server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;

//hooks for
