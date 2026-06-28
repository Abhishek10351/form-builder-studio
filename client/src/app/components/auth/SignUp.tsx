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
import { Alert, AlertTitle } from "@/components/ui/alert";
import FormPasswordInput from "@/components/ui/password";
import Image from "next/image";

const SignUp = () => {
    const redirectRoute = "/auth/login";
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
                router.push(redirectRoute);
            }, 2000);
        }
    };

    return (
        <section className="bg-background h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    {/* Logo */}
                    <a href={"/"} className="mb-4 hidden">
                        <Image
                            src={
                                "https://placehold.co/180x50?text=Form Builder Studio&font=roboto"
                            }
                            alt={"Logo"}
                            title={"Form Builder Studio"}
                            width={180}
                            height={50}
                        />
                    </a>
                    <div className="min-w-sm border-muted bg-muted flex w-full max-w-sm flex-col items-center gap-y-4 rounded-box border px-6 py-8 shadow-xl ">
                        <h1 className="text-xl font-semibold">Sign Up</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4"
                        >
                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="text-center"
                                >
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            {signUpSuccess && (
                                <Alert
                                    variant="success"
                                    className="text-center"
                                >
                                    <AlertTitle>
                                        Account created successfully!
                                    </AlertTitle>
                                </Alert>
                            )}
                            <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="text-sm bg-background"
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
                            <FormPasswordInput
                                name="password"
                                label="Password"
                                placeholder="Password"
                                register={register}
                                rules={validationRules?.signUpPassword}
                                error={errors.password?.message}
                            />
                            <FormPasswordInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                register={register}
                                rules={validationRules?.confirmPassword(password, )}
                                error={errors.confirmPassword?.message}
                            />
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
                            href={redirectRoute}
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
