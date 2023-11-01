import {useState, useEffect, CSSProperties} from 'react'

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
            window.removeEventListener('resize', resizeListener)
        }
    })
    return {
        w, 
        h
    }
}

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) => maxScale(scale, i, n)

export const useStyle = (w : number, h : number, scale : number) => {
    const background : string = "indigo"
    const size : number = Math.min(w, h) / 10
    const sf : number = sinify(scale)
    const dsc : (i : number) => number = (i : number)  : number => divideScale(sf, i, 2)
    return {
        parentStyle() : CSSProperties {
            return {
                position: 'absolute',
                left: `${w / 2}px`,
                top: `${h / 2}px`,
                transform: `rotate(${-90 * dsc(0)}deg)`
            }
        },
        barStyle() : CSSProperties {
            return {
                position: 'absolute',
                width: `${size}px`,
                height: `${size / 4}px`,
                top: `${-h * 0.5 * dsc(1)}px`,
                left: `0px`,
                background 
            }
        }
    }
}