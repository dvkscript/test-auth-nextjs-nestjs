"use client"
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormWrap from "../_components/FormWrap";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).max(10, {
    message: "First name must be less than 10 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }).max(10, {
    message: "Last name must be less than 10 characters.",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// interface PageProps { }

const Page = ({ }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <FormWrap
      {...form}
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-medium text-center mb-2">
        Tạo tài khoản
      </h1>
      <div className="flex gap-[inherit]">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="uppercase font-medium text-xs opacity-80" data-theme="dark">Họ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Họ"
                  {...field}
                  className="bg-tertiary h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="uppercase font-medium text-xs opacity-80" data-theme="dark">Tên</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên"
                  {...field}
                  className="bg-tertiary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase font-medium text-xs opacity-80" data-theme="dark">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Email"
                {...field}
                className="bg-tertiary h-10"
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
            <FormLabel className="uppercase font-medium text-xs opacity-80" data-theme="dark">Password</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="Password"
                {...field}
                className="bg-tertiary h-10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" variant={"accent"} className="mt-3 font-bold h-10">
        Đăng ký
      </Button>
      <div className="text-sm">
        <span className="opacity-70">
          Đã có tài khoản?
        </span>
        {" "}
        <Button
          variant={"link"}
          size={"link"}
          type="button"
          onClick={() => router.push("/sign-in")}
        >
          Đăng nhập
        </Button>
      </div>
    </FormWrap>
  );
};

export default Page;