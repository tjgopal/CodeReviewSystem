"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas/index";
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
import { NewPassword } from "@/actions/New-Password";
import { useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const serachParams = useSearchParams(); // to get to the token
  const token = serachParams.get("token"); // extractting the token here
  const [isPending, startTransistion] = useTransition();
  const [isError, setIsError] = useState<string | undefined>("");
  const [isSucess, setIsSucess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    // axios.post('/auth/login',values).then((response)=>console.log(response))

    setIsError("");
    setIsSucess("");
    startTransistion(() => {
      NewPassword(values, token).then((data) => {
        console.log(data);
        setIsError(data?.error);
        setIsSucess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forget Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Enter New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      className="iterms-center flex justify-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={isError} />
          {isError && <h1> {isSucess} </h1>}
          <FormSucess message={isSucess} />
          {isSucess && <h1> {isSucess} </h1>}
          <Button className="w-full items-center" type="submit">
            Send Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
