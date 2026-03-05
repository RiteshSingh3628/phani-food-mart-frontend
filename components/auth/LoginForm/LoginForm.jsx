"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { LOGIN_DEFAULT_VALUES, LOGIN_SCHEMA } from "@/lib/constants/auth/validationSchema";
import PasswordInput from "@/components/common/PasswordInput";
import ClickableLink from "@/components/common/ClickableLink";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.ok) {
          toast.success("Login successful");
          router.push("/home"); // Or dashboard, etc.
          router.refresh();
        } else {
          toast.error("Invalid credentials or error occurred");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative h-full flex flex-col justify-start mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="EMAIL ADDRESS"
          type="email"
          placeholder="name@example.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative ">
          <div className="absolute right-0 bottom-[-20px] z-10">
            <ClickableLink
              variant="link"
            >
              Forgot Password?
            </ClickableLink>
          </div>
          <PasswordInput
            label="PASSWORD"
            placeholder="Enter your password"
            error={errors.password?.message}
            register={register("password")}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Indulge"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
