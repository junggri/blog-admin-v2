export default function createActionType<T extends string>(type: string) {
  return {
    REQUEST: type + "/REQUEST",
    SUCCESS: type + "/SUCCESS",
    FAILURE: type + "/FAILURE"
  }
}
