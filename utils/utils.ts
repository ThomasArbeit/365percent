export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const formattedSecs = secs.toString().padStart(2, '0')

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${formattedSecs}`
  } else if (mins > 0) {
    return `${mins}:${formattedSecs}`
  } else {
    return `0:${formattedSecs}`
  }
}


export function getSecondsSince(timestamp: string): number {
  const date = new Date(timestamp);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / 1000);
}


export function getRankFromXp(xp: number): string {
  if (xp >= 36_000_000) return 'SSS';
  if (xp >= 10_000_000) return 'SS';
  if (xp >= 2_000_000)  return 'S';
  if (xp >= 500_000)    return 'A';
  if (xp >= 100_000)    return 'B';
  if (xp >= 10_000)     return 'C';
  if (xp >= 1_000)      return 'D';
  return 'E';
}

export function getNextXpStepFromXp(xp: number): number | null {
  if (xp >= 36_000_000) return null;
  if (xp >= 10_000_000) return 36000000;
  if (xp >= 2_000_000)  return 10000000;
  if (xp >= 500_000)    return 2000000;
  if (xp >= 100_000)    return 500000;
  if (xp >= 10_000)     return 100000;
  if (xp >= 1_000)      return 10000;
  else return 1000;
}
