"use client";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Offline() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4 pt-24">
            <div className="max-w-md w-full text-center">
                {/* Offline Icon */}
                <div className="mb-8">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                        <WifiOff
                            className="w-24 h-24 text-gray-500 animate-pulse"
                            strokeWidth={1.5}
                        />
                    </div>
                    <h1 className="text-6xl font-bold text-gray-600 mb-2">
                        Offline
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        No Internet Connection
                    </h2>
                </div>

                {/* Offline Message */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <p className="text-gray-600 mb-4">
                        It looks like you&apos;re not connected to the internet.
                        Some features may not be available while offline.
                    </p>
                    <p className="text-sm text-gray-500">
                        Check your connection and try again.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>

                    <Button
                        onClick={() => (window.location.href = "/")}
                        variant="outline"
                        className="w-full"
                        size="lg"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Homepage
                    </Button>
                </div>

                {/* Offline Tips */}
                <div className="mt-8 text-sm text-gray-500">
                    <h3 className="font-medium mb-2">While offline you can:</h3>
                    <ul className="text-left space-y-1">
                        <li>• View previously loaded content</li>
                        <li>• Work on saved drafts</li>
                        <li>• Access cached pages</li>
                    </ul>
                </div>

                {/* Connection Status */}
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">
                            Offline Mode
                        </span>
                    </div>
                </div>

                {/* Branding */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-400">Form Builder Studio</p>
                </div>
            </div>
        </div>
    );
}
