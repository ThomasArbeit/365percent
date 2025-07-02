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