"use client"; 
import { Settings, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4 pt-24">
      <div className="max-w-lg w-full text-center">
        {/* Maintenance Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <Settings 
              className="w-24 h-24 text-orange-500 animate-spin" 
              strokeWidth={1.5}
              style={{ animationDuration: '3s' }}
            />
          </div>
          <h1 className="text-5xl font-bold text-orange-600 mb-2">
            Under Maintenance
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            We'll be back shortly
          </h2>
        </div>

        {/* Maintenance Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            We're currently performing scheduled maintenance to improve your experience.
          </p>
          <p className="text-gray-600 mb-6">
            This usually takes just a few minutes. Thank you for your patience!
          </p>
          
          {/* Estimated Time */}
          <div className="flex items-center justify-center space-x-2 text-orange-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Estimated completion: 15 minutes</span>
          </div>
        </div>

        {/* What's Being Updated */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">What we're improving:</h3>
          <div className="space-y-3 text-left">
            {[
              'Enhanced form builder performance',
              'New template collections',
              'Improved security features',
              'Bug fixes and optimizations'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-500 mb-8">
          <p>Need immediate assistance?</p>
          <p>
            <a href="mailto:support@formbuilder.com" className="text-orange-600 hover:text-orange-800 underline">
              Contact Support
            </a>
          </p>
        </div>

        {/* Auto Refresh */}
        <Button 
          onClick={() => window.location.reload()}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-6"
          size="lg"
        >
          Check Again
        </Button>

        {/* Branding */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Form Builder Studio - Maintenance Mode
          </p>
        </div>
      </div>
    </div>
  )
}