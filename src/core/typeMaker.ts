export type InitialType<T> = {
  data: T | null
  loading: boolean,
  error: Error | null
}