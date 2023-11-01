import React from "react";
import { useStyle } from "./hooks";
import withContext from "./withContext";

interface BarRotUpProps {
    w : number,
    h : number, 
    scale : number, 
    onClick : () => void
}
const BarRotUp = (props : BarRotUpProps) => {
    const {parentStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {barStyle()} onClick = {props.onClick}>
            </div>
        </div>
    )
}

export default withContext(BarRotUp)