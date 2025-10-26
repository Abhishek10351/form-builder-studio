"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface AdvancedTemplateProps {
    children: React.ReactNode;
}

export default function AdvancedTemplate({ children }: AdvancedTemplateProps) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        setIsLoading(false);

        // Update document title based on route
        const titles: { [key: string]: string } = {
            "/": "Home - Form Builder Studio",
            "/dashboard": "Dashboard - Form Builder Studio",
            "/auth/login": "Sign In - Form Builder Studio",
            "/auth/signup": "Sign Up - Form Builder Studio",
            "/not-found": "404 - Form Builder Studio",
        };

        document.title = titles[pathname] || "Form Builder Studio";

        // Set data attribute for route-specific styling if needed
        document.body.setAttribute(
            "data-route",
            pathname.replace(/\//g, "-").replace(/^-/, "") || "home"
        );
    }, [pathname]);

    // Simple fade animation for all routes
    const AnimationClass =
        "transition-opacity duration-200 ease-out opacity-100";

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
                <div className="w-8 h-8 border-3 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div
                className={`transition-opacity duration-200 ease-out ${
                    isLoading ? "opacity-0" : AnimationClass
                }`}
            >
                {children}
            </div>
        </div>
    );
}
