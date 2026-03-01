"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { SIGNUP_SCHEMA, SIGNUP_DEFAULT_VALUES } from "@/lib/constants/auth/validationSchema";
import PasswordInput from "@/components/common/PasswordInput";

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(SIGNUP_SCHEMA),
        defaultValues: SIGNUP_DEFAULT_VALUES,
    });

    const onSubmit = async (data) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Signup Data:", data);
            toast.success("Signup Successful!");
        } catch (error) {
            toast.error("Failed to sign up. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative h-full flex flex-col justify-start mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="FULL NAME"
                    type="text"
                    placeholder="Enter your full name"
                    icon={User}
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    label="EMAIL ADDRESS"
                    type="email"
                    placeholder="name@example.com"
                    icon={Mail}
                    error={errors.email?.message}
                    {...register("email")}
                />

                <PasswordInput
                    label="PASSWORD"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    register={register("password")}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Indulge"}
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
