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
import { Alert, AlertTitle } from "@/components/ui/alert";

const Login: React.FC = () => {
    const redirectRoute = "/dashboard";
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth,
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
            router.push(redirectRoute);
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(result)) {
            await dispatch(fetchUserData());
            setTimeout(() => router.push(redirectRoute), 3500);
        }
    };

    return (
        <section className="bg-background h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    <div className="min-w-sm border-muted bg-muted flex w-full max-w-sm flex-col items-center gap-y-4 rounded-xl border px-6 py-8 shadow-md">
                        <h1 className="text-xl font-semibold">Login</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4"
                            noValidate
                        >
                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="text-center"
                                >
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            {isAuthenticated && (
                                <Alert
                                    variant="success"
                                    className="text-center"
                                >
                                    <AlertTitle>Login Successful!</AlertTitle>
                                </Alert>
                            )}

                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="abc@example.com"
                                    className="text-sm bg-background"
                                    {...register(
                                        "email",
                                        validationRules.email,
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
                                    className="text-sm bg-background"
                                    {...register(
                                        "password",
                                        validationRules.loginPassword,
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
