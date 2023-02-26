export function parseAsNum(numStr: string | null): number | null {
  let batteryNum: number | null = Number(numStr);
  return Number.isFinite(batteryNum) ? batteryNum : null;
}
