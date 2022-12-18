import { RefObject, useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: ()=>void) => {
    useEffect(()=>{
        const handler = (event: MouseEvent | TouchEvent) => {
            if(!ref.current?.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handler)
        document.addEventListener("touchstart", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
        }
    },[callback])
}