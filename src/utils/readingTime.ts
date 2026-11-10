/**
 * Utility to calculate estimated reading time and word count for content sections.
 */

export interface ReadingTimeResult {
  /** Total number of words counted */
  words: number;
  /** Estimated reading duration in minutes (rounded up) */
  minutes: number;
  /** Estimated reading duration in seconds */
  seconds: number;
  /** Human-readable reading time string, e.g., '1 min read' */
  text: string;
  /** Formatted badge label including word count, e.g., '1 min read · 240 words' */
  badgeText: string;
}

/**
 * Counts words accurately in a plain-text string, ignoring punctuation and whitespace artifacts.
 */
export function countWords(text: string): number {
  if (!text || typeof text !== 'string') return 0;

  // Normalize spaces and split by whitespace
  const trimmed = text.trim();
  if (!trimmed) return 0;

  const words = trimmed
    .replace(/[^\w\s\u0900-\u097F]/g, ' ') // Support Latin and Devanagari characters
    .split(/\s+/)
    .filter((token) => token.length > 0 && !/^\d+$/.test(token)); // Filter lone numbers/empty tokens

  return words.length;
}

/**
 * Calculates estimated reading time based on standard average reading speed (default 200 wpm).
 * Accepts either a raw string or an HTMLElement whose inner text is evaluated.
 *
 * @param source Raw text string or HTMLElement reference
 * @param wordsPerMinute Reading speed (default 200 wpm)
 */
export function calculateReadingTime(
  source: string | HTMLElement | null | undefined,
  wordsPerMinute: number = 200
): ReadingTimeResult {
  if (!source) {
    return {
      words: 0,
      minutes: 1,
      seconds: 0,
      text: '1 min read',
      badgeText: '1 min read',
    };
  }

  let rawText = '';
  if (typeof source === 'string') {
    rawText = source;
  } else if ('innerText' in source) {
    rawText = source.innerText || source.textContent || '';
  }

  const words = countWords(rawText);
  const rawMinutes = words / wordsPerMinute;
  const minutes = Math.max(1, Math.ceil(rawMinutes));
  const seconds = Math.round(rawMinutes * 60);

  let text = '1 min read';
  if (words > 0) {
    text = minutes === 1 ? '1 min read' : `${minutes} min read`;
  }

  const badgeText = words > 0 ? `${text} · ${words} words` : text;

  return {
    words,
    minutes,
    seconds,
    text,
    badgeText,
  };
}
