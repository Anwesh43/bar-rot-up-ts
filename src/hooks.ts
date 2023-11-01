import {useState, useEffect} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] =  useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState<number>(window.innerWidth)
    const [h, setH] = useState<number>(window.innerHeight)
    useEffect(() => {
        const resizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', resizeListener, false)
        return () => {
            window.removeEventListener(resizeListener)
        }
    })
    return {
        w, 
        h
    }
}