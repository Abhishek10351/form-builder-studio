"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { signUpUser, clearError } from "@/lib/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { validationRules, type SignUpFormData } from "@/app/utils";

const SignUp = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormData>();

    const password = watch("password");

    // Clear error when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const onSubmit = async (data: SignUpFormData) => {
        const result = await dispatch(signUpUser(data));

        if (signUpUser.fulfilled.match(result)) {
            setSignUpSuccess(true);
            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
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
                        <h1 className="text-xl font-semibold">Sign Up</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4"
                        >
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {signUpSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
                                    Account created successfully! Redirecting to
                                    login page...
                                </div>
                            )}
                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="text-sm"
                                    {...register("name", validationRules.name)}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
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
                                        validationRules.signUpPassword
                                    )}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="text-sm"
                                    {...register(
                                        "confirmPassword",
                                        validationRules.confirmPassword(
                                            password
                                        )
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-2 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </Button>
                        </form>
                    </div>
                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>Already have an account?</p>
                        <a
                            href={"/auth/login"}
                            className="text-primary font-medium hover:underline"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
