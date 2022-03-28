import {useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom"

export default function useRedirect() {
  const token = localStorage.getItem("token");
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      history.push("/login")
    }

    if (token && location.pathname === "/login") {
      history.push("/")
    }
  }, [location])

}
