export type CardEmit = {
  (e: 'click'): void,
  (e: 'press'): void,
}

export function CardSetup (emit: CardEmit) {
  return null;
}