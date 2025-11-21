'use client'

import { useState } from 'react'
import {
  Search,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react'

interface SearchResult {
  place_id: string
  name: string
  formatted_address: string
  rating: number
  user_ratings_total: number
  types: string[]
}

export default function ReviewResponseTool() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  // Call Next.js API Route for Places Search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchResults([])

    try {
      const response = await fetch('/api/places/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.results && data.results.length > 0) {
        setSearchResults(data.results)
      } else {
        setSearchResults([])
        alert('Keine Ergebnisse gefunden. Versuche einen anderen Suchbegriff.')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Fehler bei der Suche. Bitte versuche es erneut.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Review Response Tool
        </h2>

        {/* Search Input */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Suche nach einem Geschäft..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Suche...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Suchen
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Suchergebnisse ({searchResults.length})
            </h3>
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {result.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {result.formatted_address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      {result.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{result.rating}</span>
                          <span className="text-gray-500">
                            ({result.user_ratings_total} Bewertungen)
                          </span>
                        </div>
                      )}
                      {result.types.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">
                            {result.types.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title="Kopieren"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length === 0 && !isSearching && searchQuery && (
          <div className="text-center py-8 text-gray-500">
            <p>Keine Ergebnisse gefunden</p>
          </div>
        )}
      </div>
    </div>
  )
}
