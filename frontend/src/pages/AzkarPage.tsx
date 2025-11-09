import { useState } from 'react'
import { Card, CardBody, CardHeader, Button } from '@components/ui'
import { Heart, Volume2, ChevronDown, ChevronUp } from 'lucide-react'

interface Dhikr {
  id: string
  title: string
  arabic: string
  transliteration: string
  translation: string
  repetitions: number
  reference: string
  category: 'before_sleep' | 'after_waking'
}

export default function AzkarPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [category, setCategory] = useState<'before_sleep' | 'after_waking'>('before_sleep')

  // Mock data - replace with API call
  const azkar: Dhikr[] = [
    {
      id: '1',
      title: 'Ayat al-Kursi',
      arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...',
      transliteration: "Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm...",
      translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...',
      repetitions: 1,
      reference: 'Surah Al-Baqarah 2:255',
      category: 'before_sleep',
    },
    {
      id: '2',
      title: 'Last Two Verses of Surah Al-Baqarah',
      arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ...',
      transliteration: "Āmana ar-rasūlu bimā unzila ilayhi min rabbihi wa al-mu'minūn...",
      translation: 'The Messenger has believed in what was revealed to him from his Lord, and so have the believers...',
      repetitions: 1,
      reference: 'Surah Al-Baqarah 2:285-286',
      category: 'before_sleep',
    },
    {
      id: '3',
      title: 'Surah Al-Ikhlas, Al-Falaq, and An-Nas',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ...',
      transliteration: "Qul huwa Allāhu aḥad...",
      translation: 'Say, "He is Allah, [who is] One..."',
      repetitions: 3,
      reference: 'Surah 112, 113, 114',
      category: 'before_sleep',
    },
    {
      id: '4',
      title: 'In the name of Allah',
      arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
      transliteration: "Bismika rabbī waḍaʿtu janbī wa bika arfaʿuh...",
      translation: 'In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants.',
      repetitions: 1,
      reference: 'Sahih al-Bukhari 6320',
      category: 'before_sleep',
    },
    {
      id: '5',
      title: 'SubhanAllah, Alhamdulillah, Allahu Akbar',
      arabic: 'سُبْحَانَ اللَّهِ (33)، الْحَمْدُ لِلَّهِ (33)، اللَّهُ أَكْبَرُ (34)',
      transliteration: 'Subḥān Allāh (33), Al-ḥamdu lillāh (33), Allāhu akbar (34)',
      translation: 'Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (34 times)',
      repetitions: 100,
      reference: 'Sahih al-Bukhari 5362',
      category: 'before_sleep',
    },
  ]

  const filteredAzkar = azkar.filter(dhikr => dhikr.category === category)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Heart className="h-8 w-8 text-islamic-green-600" />
          Night Azkar & Remembrance
        </h1>
        <p className="text-gray-600">
          Prophetic supplications and remembrance for peaceful sleep and protection
        </p>
      </div>

      {/* Info Card */}
      <Card className="mb-8 bg-gradient-to-r from-islamic-green-50 to-white">
        <CardBody className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Benefits of Night Azkar</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-islamic-green-600 font-bold">•</span>
              <span>Protection from harm and nightmares</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-green-600 font-bold">•</span>
              <span>Peace of mind and tranquility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-green-600 font-bold">•</span>
              <span>Better sleep quality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-green-600 font-bold">•</span>
              <span>Spiritual connection with Allah</span>
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-6">
        <Button
          variant={category === 'before_sleep' ? 'primary' : 'outline'}
          onClick={() => setCategory('before_sleep')}
        >
          Before Sleep
        </Button>
        <Button
          variant={category === 'after_waking' ? 'primary' : 'outline'}
          onClick={() => setCategory('after_waking')}
        >
          After Waking
        </Button>
      </div>

      {/* Azkar List */}
      <div className="space-y-4">
        {filteredAzkar.map((dhikr) => (
          <Card key={dhikr.id} variant="bordered">
            <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(dhikr.id)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{dhikr.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Repeat {dhikr.repetitions} {dhikr.repetitions === 1 ? 'time' : 'times'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  {expandedId === dhikr.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedId === dhikr.id && (
              <CardBody className="pt-0 space-y-4">
                {/* Arabic Text */}
                <div className="bg-islamic-green-50 rounded-lg p-4">
                  <p className="text-2xl text-right leading-loose" dir="rtl" lang="ar">
                    {dhikr.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Transliteration:</h4>
                  <p className="text-gray-700 italic">{dhikr.transliteration}</p>
                </div>

                {/* Translation */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Translation:</h4>
                  <p className="text-gray-700">{dhikr.translation}</p>
                </div>

                {/* Reference */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Reference:</strong> {dhikr.reference}
                  </p>
                </div>
              </CardBody>
            )}
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card className="mt-8 bg-gray-50">
        <CardBody className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Sleep According to Sunnah</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Sleep on your right side</li>
            <li>• Make wudu (ablution) before sleeping</li>
            <li>• Dust off your bed three times with the edge of your garment</li>
            <li>• Recite the mentioned supplications</li>
            <li>• Avoid sleeping on your stomach</li>
            <li>• Sleep early and wake up for Fajr</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
