export type ChatMessage = {
  id: string,
  timestamp: number,
  color: string | null;
  nickname: string,
  badges: unknown[]
  text: string
}