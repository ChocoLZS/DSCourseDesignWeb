import { useEffect, useMemo, useRef } from "react"

export function useInterval(callback: any, delay: number | null) {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    })
    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}