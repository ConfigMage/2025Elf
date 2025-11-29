interface Kid {
  id: string
  name: string
  avatarUrl?: string | null
  niceScore: number
}

interface NiceScoreCardProps {
  kids: Kid[]
}

export default function NiceScoreCard({ kids }: NiceScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-elf-green'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 95) return '🌟'
    if (score >= 90) return '⭐'
    if (score >= 80) return '😊'
    if (score >= 70) return '🙂'
    return '📝'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-elf-gold to-yellow-500 p-4 text-center">
        <h2 className="text-xl font-bold text-white flex items-center justify-center space-x-2">
          <span>📋</span>
          <span>Santa&apos;s Nice List Tracker</span>
          <span>🎅</span>
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {kids.map((kid) => (
          <div key={kid.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-elf-red/10 rounded-full flex items-center justify-center text-xl">
                  {kid.avatarUrl ? (
                    <img
                      src={kid.avatarUrl}
                      alt={kid.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    '👧'
                  )}
                </div>
                <span className="font-semibold text-gray-800">{kid.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getScoreEmoji(kid.niceScore)}</span>
                <span className="font-bold text-lg text-elf-green">{kid.niceScore}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreColor(kid.niceScore)} transition-all duration-500 ease-out rounded-full`}
                style={{ width: `${kid.niceScore}%` }}
              />
            </div>
          </div>
        ))}

        <p className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
          🧝 Sprinkles reports to Santa every night!
        </p>
      </div>
    </div>
  )
}
