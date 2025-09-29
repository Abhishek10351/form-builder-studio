import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-8">
          {/* Outer spinning ring */}
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Inner sparkle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Loading...
          </h2>
          <p className="text-gray-600 max-w-md">
            Please wait while we prepare your form building experience
          </p>
        </div>

        {/* Loading Steps Animation */}
        <div className="mt-8 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Progress Simulation */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Form Builder Studio
          </p>
        </div>
      </div>
    </div>
  )
}