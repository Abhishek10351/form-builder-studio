"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import { useEffect } from "react";

const NotFound: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = "404 - Page Not Found | Form Builder Studio";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4 pt-24 pb-8">
            <div className="max-w-md w-full text-center">
                {/* 404 Animation/Illustration */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-primary mb-4 relative">
                            4
                            <span className="inline-block transform rotate-12">
                                <FileQuestion className="h-16 w-16 text-primary/60 mx-4" />
                            </span>
                            4
                        </div>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-muted-foreground text-lg mb-2">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist.
                    </p>
                    <p className="text-muted-foreground">
                        It might have been moved, deleted, or you entered the
                        wrong URL.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>

                    <Button
                        onClick={() => router.push("/")}
                        className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Button>
                </div>

                {/* Additional Help */}
                <div className="mt-8 p-4 bg-card rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
                        <Search className="h-4 w-4" />
                        What can you do?
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Check the URL for typos</li>
                        <li>• Go back to the previous page</li>
                        <li>• Visit our homepage</li>
                        <li>• Try using the navigation menu</li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/dashboard")}
                        className="text-primary hover:text-primary/90 hover:bg-primary/5"
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/auth/login")}
                        className="text-primary hover:text-primary/90 hover:bg-primary/5"
                    >
                        Login
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/auth/signup")}
                        className="text-primary hover:text-primary/90 hover:bg-primary/5"
                    >
                        Sign Up
                    </Button>
                </div>

                {/* Form Builder Studio Branding */}
                <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">
                            Form Builder Studio
                        </span>{" "}
                        - Build forms with ease
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
