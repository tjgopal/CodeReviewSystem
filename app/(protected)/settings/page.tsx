"use client";

import { SettingsServerActions } from "@/actions/settiings";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { UseCurrentUSer } from "@/hooks/use-current-user";

import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Switch } from "@/components/ui/switch";
//updating session

const Settings = () => {
  const user = UseCurrentUSer();
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, setTransistion] = useTransition();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newpassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      is2FaEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setTransistion(() => {
      SettingsServerActions(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.sucess) {
            setSucess(data.sucess);
          }
        })
        .catch(() => setError("Something went Wrong"));
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-medium">🧑🏻‍💻 Settings</p>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter name"
                          type="name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="example@gmail.com"
                              type="email"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="***********"
                              type="password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newpassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="***********"
                              type="password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="is2FaEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row justify-between p-3 items-center shadow-sm rounded-lg border">
                          <div className="space-y-0.5">
                            <FormLabel>
                              2FA Authentication
                              <FormDescription>
                                Enable 2Fa for your Account
                              </FormDescription>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSucess message={sucess} />
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Settings;
