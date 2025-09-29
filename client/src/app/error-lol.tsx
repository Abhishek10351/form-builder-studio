'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
    
    // Set dynamic title
    document.title = 'Error - Form Builder Studio'
    
    return () => {
      document.title = 'Form Builder Studio'
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <AlertTriangle 
              className="w-24 h-24 text-red-500 animate-pulse" 
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-6xl font-bold text-red-600 mb-2">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Something went wrong
          </h2>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800 mb-2">
                Technical Details (Development)
              </summary>
              <pre className="text-xs bg-red-50 p-3 rounded border overflow-auto max-h-32">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Still having trouble?</p>
          <p>
            <a href="mailto:support@formbuilder.com" className="text-red-600 hover:text-red-800 underline">
              Contact Support
            </a>
            {' '}or{' '}
            <button 
              onClick={() => window.location.reload()} 
              className="text-red-600 hover:text-red-800 underline"
            >
              refresh the page
            </button>
          </p>
        </div>

        {/* Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Form Builder Studio
          </p>
        </div>
      </div>
    </div>
  )
}