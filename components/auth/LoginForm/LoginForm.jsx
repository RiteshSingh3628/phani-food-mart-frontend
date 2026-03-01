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

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login Data:", data);
      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    }
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Indulge"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
