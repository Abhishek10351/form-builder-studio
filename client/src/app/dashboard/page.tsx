"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, user, isLoading, token } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!isAuthenticated && !token) {
            router.push("/auth/login");
            return;
        }
    }, [isAuthenticated, token, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-card shadow rounded-lg border">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-foreground">
                                Dashboard
                            </h1>
                            <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-muted-foreground">
                                    Online
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                                <h3 className="text-lg font-medium text-primary mb-2">
                                    Welcome Back!
                                </h3>
                                <p className="text-foreground">
                                    Hello, {user?.name || "User"}! You&apos;re
                                    successfully logged in.
                                </p>
                            </div>

                            <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
                                    Account Status
                                </h3>
                                <p className="text-green-700 dark:text-green-300">
                                    {user?.is_active ? "Active" : "Inactive"}{" "}
                                    Account
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                    Role:{" "}
                                    {user?.is_superuser ? "Admin" : "User"}
                                </p>
                            </div>

                            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    Email
                                </h3>
                                <p className="text-blue-700 dark:text-blue-300 text-sm">
                                    {user?.email || "Not available"}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-border pt-6">
                            <h2 className="text-lg font-medium text-foreground mb-4">
                                Quick Actions
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                >
                                    Go to Home
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    onClick={() => window.location.reload()}
                                >
                                    Refresh Page
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
