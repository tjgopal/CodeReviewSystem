// app/(protected)/settings/page.tsx

"use client";

import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { codeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [results, setResults] = useState<string | undefined>();
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);

  const [isPending, setTransistion] = useTransition();
  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: undefined,
      question: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof codeSchema>) => {
    console.log(values);
    try {
      const response = await axios.post("/api/routes", {
        code: values.code,
        question: values.question,
      });
      const apiResult = response.data.result.content;
      console.log("API Result:", apiResult);
      setResults(apiResult);
      setIsResultVisible(true);
      setSuccess("Your code has been submitted successfully!");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting your code.");
    }
  };

  return (
    <div className="relative overflow-y-auto h-screen">
      {isResultVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50  ">
          {/* Modal overlay */}
          <div className="absolute inset-0 bg-black opacity-50 "></div>

          <div className="bg-white p-8 rounded-md shadow-md z-10 max-w-2xl mx-auto relative overflow-y-auto max-h-[80vh]">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setIsResultVisible(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">
              Review Results: 🧑🏻‍💻
            </h2>
            <p className="whitespace-pre-wrap text-black">{results}</p>
          </div>
        </div>
      )}

      <div className={`${isResultVisible ? "blur-md" : ""}`}>
        <Card className="w-[800px] mx-auto">
          <CardHeader className="space-y-4">
            <p className="text-2xl font-medium w-full text-center">
              🧑🏻‍💻 Code Reviewer
            </p>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter your code here </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your code here </>"
                              className="min-h-96"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter your question here </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your question here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormError message={error} />
                  <FormSucess message={success} />
                  <Button type="submit">Check</Button>
                </form>
              </Form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
