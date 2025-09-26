"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
    api,
    LoginFormData,
    validationRules,
    submitForm,
    redirectAfterDelay,
} from "@/app/utils";

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const onSubmit = async (data: LoginFormData) => {
        setSubmitError(null);
        setSubmitSuccess(false);

        const result = await submitForm(
            data,
            (loginData) => api.post("/login", loginData),
            "Login"
        );

        if (result.success) {
            // Save the token in cookies
            console.log(result.data);

            if (result.data && result.data.access) {
                const accessToken = result.data.access;
                const expires = result.data.expires || 10;
                Cookies.set("access", accessToken, { expires });
                console.log("Token saved to cookies", expires);
            }
            setSubmitSuccess(true);
            // Handle successful login here (store token, etc.)
            // Redirect to dashboard after a short delay
            redirectAfterDelay(router, "/", 1500);
        } else {
            setSubmitError(result.error);
        }
    };

    return (
        <section className="bg-muted h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    {/* Logo */}
                    <a href={"/"} className="mb-4 hidden">
                        <img
                            src={
                                "https://placehold.co/180x50?text=Form Builder Studio&font=roboto"
                            }
                            alt={"Logo"}
                            title={"Form Builder Studio"}
                            className="h10 dark:invert"
                        />
                    </a>
                    <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                        <h1 className="text-xl font-semibold">Login</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4"
                        >
                            {submitError && (
                                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
                                    {submitError}
                                </div>
                            )}
                            {submitSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
                                    Login successful! Redirecting to
                                    dashboard...
                                </div>
                            )}
                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="text-sm"
                                    {...register(
                                        "email",
                                        validationRules.email
                                    )}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="text-sm"
                                    {...register(
                                        "password",
                                        validationRules.loginPassword
                                    )}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-2 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </div>
                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>Need an account?</p>
                        <a
                            href={"/auth/signup"}
                            className="text-primary font-medium hover:underline"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
