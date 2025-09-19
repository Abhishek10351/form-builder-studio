import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
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
                        <div className="flex w-full flex-col gap-2">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Your Name"
                                className="text-sm"
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                className="text-sm"
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="text-sm"
                                required
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className="text-sm"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
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
