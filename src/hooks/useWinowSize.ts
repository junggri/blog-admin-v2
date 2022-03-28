import {useEffect, useState} from "react";

export function useWindowSize(initialWidth = Infinity, initialHeight = Infinity) {
  const [state, setState] = useState<{ width: number, height: number }>({
    width: typeof window === "object" ? window.innerWidth : initialWidth,
    height: typeof window === "object" ? window.innerHeight : initialHeight
  })

  useEffect((): (() => void) | void => {
    if (typeof window !== "object") {
      return
    }
    const resizeHandler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return [state.width, state.height]
}