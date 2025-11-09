import { format } from 'date-fns'

interface InterpretationProps {
  interpretation: any
  onReset: () => void
}

const IstikharaInterpretation = ({ interpretation, onReset }: InterpretationProps) => {
  const {
    title,
    description,
    istikhara_decision,
    emotions,
    symbols,
    colors,
    dream_date,
    created_at,
    interpretation: interpretationData,
  } = interpretation

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-green-600 mt-1 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              Interpretation Complete
            </h3>
            <p className="text-green-700">
              Your Istikhara dream has been interpreted. Please read carefully and reflect.
            </p>
          </div>
        </div>
      </div>

      {/* Dream Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-islamic-green-700 mb-4">
          Your Dream
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">
              Title
            </h3>
            <p className="text-lg font-medium text-gray-900">{title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">
              Decision Context
            </h3>
            <p className="text-gray-700 bg-islamic-teal-50 p-3 rounded-lg">
              {istikhara_decision}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">
              Dream Description
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            {emotions && emotions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Emotions</h4>
                <div className="flex flex-wrap gap-1">
                  {emotions.map((emotion: string) => (
                    <span
                      key={emotion}
                      className="px-2 py-1 bg-islamic-green-100 text-islamic-green-700 rounded text-xs"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {colors && colors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Colors</h4>
                <div className="flex flex-wrap gap-1">
                  {colors.map((color: string) => (
                    <span
                      key={color}
                      className="px-2 py-1 bg-islamic-teal-100 text-islamic-teal-700 rounded text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {symbols && symbols.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Symbols</h4>
                <div className="flex flex-wrap gap-1">
                  {symbols.map((symbol: string) => (
                    <span
                      key={symbol}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interpretation Card */}
      {interpretationData && (
        <div className="bg-gradient-to-br from-islamic-green-50 to-islamic-teal-50 shadow-lg rounded-lg p-6 border-2 border-islamic-green-200">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-islamic-green-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-islamic-green-800">
              Interpretation
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {interpretationData.content}
            </div>
          </div>

          {interpretationData.spiritual_guidance && (
            <div className="mt-6 bg-white rounded-lg p-4 border-l-4 border-islamic-teal-500">
              <h3 className="text-sm font-semibold text-islamic-teal-700 uppercase mb-2">
                Spiritual Guidance
              </h3>
              <p className="text-gray-700">{interpretationData.spiritual_guidance}</p>
            </div>
          )}

          {interpretationData.confidence_score && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Confidence Score: {(interpretationData.confidence_score * 100).toFixed(0)}%
            </div>
          )}
        </div>
      )}

      {/* Important Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-yellow-600 mt-1 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-yellow-800 mb-2">Important Reminder</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>This is an AI-generated interpretation based on Islamic dream interpretation traditions</li>
              <li>Not all dreams after Istikhara are divine guidance</li>
              <li>Dreams can come from yourself, Shaytan, or Allah</li>
              <li>Consult with knowledgeable scholars for important life decisions</li>
              <li>Continue to make Dua and seek Allah's guidance through other means</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-6 bg-islamic-green-600 hover:bg-islamic-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          Submit Another Dream
        </button>
        <button
          onClick={() => window.print()}
          className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          Print
        </button>
      </div>
    </div>
  )
}

export default IstikharaInterpretation
