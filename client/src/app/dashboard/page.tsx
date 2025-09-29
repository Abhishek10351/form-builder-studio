"use client";

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();
    const dispatch = useAppDispatch();
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
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Dashboard
                            </h1>
                            <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-gray-600">
                                    Online
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="p-6 bg-indigo-50 rounded-lg">
                                <h3 className="text-lg font-medium text-indigo-900 mb-2">
                                    Welcome Back!
                                </h3>
                                <p className="text-indigo-700">
                                    Hello, {user?.name || "User"}! You're
                                    successfully logged in.
                                </p>
                            </div>

                            <div className="p-6 bg-green-50 rounded-lg">
                                <h3 className="text-lg font-medium text-green-900 mb-2">
                                    Account Status
                                </h3>
                                <p className="text-green-700">
                                    {user?.is_active ? "Active" : "Inactive"}{" "}
                                    Account
                                </p>
                                <p className="text-sm text-green-600 mt-1">
                                    Role:{" "}
                                    {user?.is_superuser ? "Admin" : "User"}
                                </p>
                            </div>

                            <div className="p-6 bg-blue-50 rounded-lg">
                                <h3 className="text-lg font-medium text-blue-900 mb-2">
                                    Email
                                </h3>
                                <p className="text-blue-700 text-sm">
                                    {user?.email || "Not available"}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
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
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
