"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { SIGNUP_SCHEMA, SIGNUP_DEFAULT_VALUES } from "@/lib/constants/auth/validationSchema";
import PasswordInput from "@/components/common/PasswordInput";
import { useTransition } from "react";
import { signUp } from "@/framework/server-actions/auth/action";
import { useRouter } from "next/navigation";
import ROUTES_PATH from "@/lib/constants/routePaths";

const SignupForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SIGNUP_SCHEMA),
        defaultValues: SIGNUP_DEFAULT_VALUES,
    });
    const [isPending, startTransition] = useTransition();
    const onSubmit = async (data) => {
        startTransition(async () => {
            const response = await signUp(data);
            if (response.success) {
                toast.success(response.message);
                router.push(ROUTES_PATH.LOGIN);
            } else {
                toast.error(response.message);
            }
        })
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
                    {...register("fullName")}
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

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Signing up..." : "Indulge"}
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
