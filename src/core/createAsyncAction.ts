import createActionType from "./createActionType";

const createAsyncAction = <T extends string, F extends (...arg: any[]) => any>(action: T, func: F) => {
  const {REQUEST, SUCCESS, FAILURE} = createActionType(action);

  return (...arg: any[]) => {
    return {
      type: REQUEST,
      payload: [() => func(...arg), SUCCESS, FAILURE]
    } as any
  }
}

export default createAsyncAction
