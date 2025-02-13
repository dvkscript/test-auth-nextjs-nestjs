"use client"
import React from "react"
import FormWrap from "../_components/FormWrap";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next-nprogress-bar";

const FormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type TFormSchema = z.infer<typeof FormSchema>;

// interface PageProps { }

const Page = ({ }) => {
  const router = useRouter();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: TFormSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  };

  return (
    <FormWrap
      {...form}
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-medium text-center mb-2">
        Chào mừng trở lại!
      </h1>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase font-medium text-xs opacity-80">Email hoặc Số Điện Thoại</FormLabel>
            <FormControl>
              <Input placeholder="Nhập email" {...field} className="bg-tertiary h-10" />
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
            <FormLabel className="uppercase font-medium text-xs opacity-80" data-theme="dark">Mật khẩu</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="Nhập password"
                {...field}
                className="bg-tertiary h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <Button
          variant={"link"}
          size={"link"}
          type="button"
        >
          Quên mật khẩu?
        </Button>
      </div>
      <Button type="submit" variant={"accent"} className="mt-1 font-bold h-10">
        Đăng nhập
      </Button>
      <div className="text-sm">
        <span className="opacity-70">
          Chưa có tài khoản?
        </span>
        {" "}
        <Button
          variant={"link"}
          size={"link"}
          type="button"
          onClick={() => router.push("/sign-up")}
        >
          Đăng ký
        </Button>
      </div>
    </FormWrap>
  );
};

export default Page;