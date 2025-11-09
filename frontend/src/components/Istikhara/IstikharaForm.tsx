import { useState } from 'react'

interface IstikharaFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

const IstikharaForm = ({ onSubmit, isLoading }: IstikharaFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    istikhara_decision: '',
    dream_date: '',
    time_of_day: 'night',
    privacy: 'private',
  })

  const [emotions, setEmotions] = useState<string[]>([])
  const [symbols, setSymbols] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  const emotionOptions = ['Peace', 'Anxiety', 'Joy', 'Fear', 'Confusion', 'Clarity', 'Hope']
  const colorOptions = ['White', 'Green', 'Black', 'Gold', 'Blue', 'Red', 'Yellow']
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night', 'Dawn']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      ...formData,
      emotions: emotions.length > 0 ? emotions : undefined,
      symbols: symbols.length > 0 ? symbols : undefined,
      colors: colors.length > 0 ? colors : undefined,
    }

    onSubmit(data)
  }

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (list: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dream Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          placeholder="A brief title for your dream"
        />
      </div>

      {/* Istikhara Decision */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What decision did you make Istikhara for? *
        </label>
        <textarea
          required
          value={formData.istikhara_decision}
          onChange={(e) =>
            setFormData({ ...formData, istikhara_decision: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          rows={2}
          placeholder="E.g., Choosing between two job offers, marriage decision, moving to a new city..."
        />
      </div>

      {/* Dream Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dream Description *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          rows={6}
          placeholder="Describe your dream in as much detail as you can remember..."
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
      </div>

      {/* Dream Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When did you see this dream?
          </label>
          <input
            type="date"
            value={formData.dream_date}
            onChange={(e) => setFormData({ ...formData, dream_date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time of Day
          </label>
          <select
            value={formData.time_of_day}
            onChange={(e) => setFormData({ ...formData, time_of_day: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time.toLowerCase()}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Emotions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emotions felt during the dream
        </label>
        <div className="flex flex-wrap gap-2">
          {emotionOptions.map((emotion) => (
            <button
              key={emotion}
              type="button"
              onClick={() => toggleSelection(emotion, emotions, setEmotions)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                emotions.includes(emotion)
                  ? 'bg-islamic-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prominent colors in the dream
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => toggleSelection(color, colors, setColors)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                colors.includes(color)
                  ? 'bg-islamic-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Symbols */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key symbols (optional)
        </label>
        <input
          type="text"
          value={symbols.join(', ')}
          onChange={(e) =>
            setSymbols(
              e.target.value.split(',').map((s) => s.trim()).filter((s) => s)
            )
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
          placeholder="E.g., Water, Light, Book, Garden (comma separated)"
        />
      </div>

      {/* Privacy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Privacy Setting
        </label>
        <select
          value={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-transparent"
        >
          <option value="private">Private (Only me)</option>
          <option value="friends">Friends</option>
          <option value="public">Public</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-islamic-green-600 hover:bg-islamic-green-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit for Interpretation'
          )}
        </button>
      </div>
    </form>
  )
}

export default IstikharaForm
