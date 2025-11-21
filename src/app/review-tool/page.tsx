'use client'

import ReviewResponseTool from '@/components/ReviewResponseTool'

export default function ReviewToolPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Review Response Tool
        </h1>
        <ReviewResponseTool />
      </div>
    </main>
  )
}

