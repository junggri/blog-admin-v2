import {useEffect, useState} from "react";

export function useScroll() {
  const [scroll, setScroll] = useState<{ x: number, y: number }>({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const scrollHandler = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY
      })
    }
    scrollHandler()
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  return [scroll.x, scroll.y]
}