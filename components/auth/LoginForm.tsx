"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas/index";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSucess } from "../form-success";
import { login } from "@/actions/login";
import axios from "axios";
import Link from "next/link";
import { error } from "console";

const LoginForm = () => {
  const serachParams = useSearchParams();
  const URLerror =
    serachParams.get("error") == "OAuthAccountNotLinked"
      ? "Email is already present"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransistion] = useTransition();
  const [isError, setIsError] = useState<string | undefined>("");
  const [isSucess, setIsSucess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // axios.post('/auth/login',values).then((response)=>console.log(response))
    console.log(values);
    setIsError("");
    setIsSucess("");
    startTransistion(() => {
      login(values)
        .then((data) => {
          console.log(data);
          if (data?.error) {
            form.reset();
            setIsError(data.error);
          }
          if (data?.success) {
            form.reset();
            setIsSucess(data.success);
          }
          if (data?.twofactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setIsError("soemthing went wrong"));
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Dont have an account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter 2FA code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
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
                          placeholder="Enter email"
                          type="email"
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
                          placeholder="Enter password"
                          type="password"
                        />
                      </FormControl>
                      <Button className="px-2" size="sm" variant="link" asChild>
                        <Link href="/auth/reset">Forgot Password</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={isError || URLerror} />
          <FormSucess message={isSucess} />
          <Button className="w-full items-center" type="submit">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
