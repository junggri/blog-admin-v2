import {useWindowSize} from "hooks/useWinowSize";
import {useScroll} from "hooks/useScroll";
import {useEffect} from "react";

export function useLoadMore(callback: () => void, threshold: number = 200) {
  const [width, height] = useWindowSize();
  const [x, y] = useScroll();


  useEffect(() => {
    if (typeof window !== "object") {
      return;
    }

    if (document.body.scrollHeight <= height + y) {
      callback();
    }

  }, [callback, y]);
}