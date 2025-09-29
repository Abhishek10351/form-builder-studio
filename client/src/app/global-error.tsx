'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            {/* Critical Error Icon */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <AlertTriangle 
                  className="w-32 h-32 text-red-500 animate-bounce" 
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 animate-ping">
                  <AlertTriangle 
                    className="w-32 h-32 text-red-300" 
                    strokeWidth={1}
                  />
                </div>
              </div>
              <h1 className="text-7xl font-bold text-red-600 mb-4">
                ERROR
              </h1>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Critical System Error
              </h2>
            </div>

            {/* Error Description */}
            <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-l-4 border-red-500">
              <p className="text-lg text-gray-700 mb-4">
                A critical error has occurred that prevents the application from running properly.
              </p>
              <p className="text-gray-600">
                This is a system-level error that requires immediate attention. Please try refreshing the page or contact support if the problem persists.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800 mb-2 font-medium">
                    Error Details (Development Mode)
                  </summary>
                  <div className="bg-red-50 p-4 rounded border">
                    <pre className="text-xs text-red-800 overflow-auto max-h-40 whitespace-pre-wrap">
                      {error.message}
                      {error.stack && `\n\nStack Trace:\n${error.stack}`}
                    </pre>
                  </div>
                </details>
              )}
            </div>

            {/* Recovery Actions */}
            <div className="space-y-4">
              <Button 
                onClick={reset}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-3" />
                Restart Application
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  size="lg"
                >
                  Reload Page
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  size="lg"
                >
                  Go Home
                </Button>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Need Immediate Help?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Support Email:</strong>{' '}
                  <a href="mailto:support@formbuilder.com" className="text-red-600 hover:text-red-800 underline">
                    support@formbuilder.com
                  </a>
                </p>
                <p>
                  <strong>Error ID:</strong> {error.digest || 'N/A'}
                </p>
                <p>
                  <strong>Time:</strong> {new Date().toISOString()}
                </p>
              </div>
            </div>

            {/* Branding */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                Form Builder Studio - Critical Error Handler
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}