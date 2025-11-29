import { formatDistanceToNow, format, isPast, differenceInSeconds } from 'date-fns'

export function getRevealTime(): Date {
  const revealAt = process.env.NEXT_PUBLIC_REVEAL_AT
  if (!revealAt) {
    // Default to a past time if not set (always revealed)
    return new Date(0)
  }
  return new Date(revealAt)
}

export function isRevealed(): boolean {
  const revealTime = getRevealTime()
  return isPast(revealTime)
}

export function getTimeUntilReveal(): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const revealTime = getRevealTime()
  const now = new Date()
  const total = Math.max(0, differenceInSeconds(revealTime, now))

  const days = Math.floor(total / (60 * 60 * 24))
  const hours = Math.floor((total % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((total % (60 * 60)) / 60)
  const seconds = total % 60

  return { days, hours, minutes, seconds, total }
}

export function formatPostDate(date: Date): string {
  return format(date, 'EEEE, MMMM do, yyyy')
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}
