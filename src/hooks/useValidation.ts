import {Formik} from "../pages/message/message";

export default function UseValidation(values: Formik) {
  return Object.values(values).some((e) => e === "")
}
