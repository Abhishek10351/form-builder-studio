"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
    loginUser,
    clearError,
    fetchUserData,
} from "@/lib/redux/slices/authSlice";
import { useEffect } from "react";
import { validationRules, type LoginFormData } from "@/app/utils";

const Login: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    // Clear error when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(result)) {
            await dispatch(fetchUserData());
            setTimeout(() => router.push("/dashboard"), 1500);
        }
    };

    return (
        <section className="bg-muted h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                        <h1 className="text-xl font-semibold">Login</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4"
                            noValidate
                        >
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {isAuthenticated && (
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
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </div>
                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>Need an account?</p>
                        <a
                            href="/auth/signup"
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
