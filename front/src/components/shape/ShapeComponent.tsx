import React, {useEffect, useState,useRef} from 'react';
import classes from "../dashboard/Dashboard.module.css";
import {Shape} from "../../canva";
// import {Shape} from "../dashboard/Dashboard";


type ShapeProps =  {
    shape:Shape
}
const ShapeComponent:React.FC<ShapeProps> = (props) => {
    // const {} =
    const [shape,setShape] = useState<Shape>(()=>props.shape)
    const [isDragging, setIsDragging] = useState(false);
    const positionRef = useRef<{x:number,y:number}>()
    const onMouseDownHandler = (e:any)=>{
        // console.log(e.target.value)
        setIsDragging(true)
    }
    const onMouseUpHandler = (e:any)=>{
        // console.log(e.target.value)
        setIsDragging(false)
    }
    const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!isDragging){
            return
        }

        positionRef.current = {x:e.clientX,y:e.clientY}
        console.log(e.movementX)
        // console.log(e.clientY)
        setShape({...shape,
        // x:e.client.x - offset.x
        })
    }
    useEffect(()=>{
        // window.document.addEventListener('click', (event) => {
        //     const mousePositionDiv = document.getElementById('root');
        //
        //
        //     mousePositionDiv?.addEventListener('mousemove', (e) => {
        //         const x = e.clientX;
        //         const y = e.clientY;
        //         console.log(x,y)
        //         // @ts-ignore
        //         // mousePositionDiv.textContent = `X: ${x}, Y: ${y}`;
        //     });
        // });

    },[])

    return (
        <div>

                <div
                onMouseMove={(e)=>onMouseMoveHandler(e)}
                onMouseDown={onMouseDownHandler}
                onMouseUp={onMouseUpHandler}
                // onmouse
                // onDrag
                // onDragStart={ondragstart}
                draggable={true}
                style={{
                left:shape.x,
                top:shape.y,
                zIndex:shape.z,
                width:shape.width,
                height:shape.height,
                // backgroundColor:shape.backgroundColor
            }}
                className={classes.shape}
                key={shape.id}
                >
                111
            {typeof shape.value==="string"&&shape.value}
                </div>

        </div>
    );
};

export default ShapeComponent;
