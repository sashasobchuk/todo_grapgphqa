import classes from './Dashboard.module.css'
import ShapeComponent from "../shape/ShapeComponent";
import {MouseEventHandler, useEffect, useRef, useState} from "react";

export type Shape = {
    id:number
    x:number,
    y:number,
    type:string
    width:number
    height:number
    value:ValueType
    backgroundColor:string,
    z:number,
    line:number
}

const newShape:Shape = {
    id:Date.now(),
    x:50,
    y:50,
    type:'squere',
    width:100,
    height:100,
    z:1,
    backgroundColor:'red',
    value:'123123213',
    line:2
}
const getNewShape =  ()=>{
    return newShape
}

type ValueType = {} |string
const Dashboard = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [state,setState] = useState(1)
    // let [shapes,setShapes] = useState<Shape[]>([])
    const shapes = useRef<Shape[]>([])
    const createShape = (xParam?:number,yParam?:number) => {

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }
        const newShape = getNewShape()
        const x = xParam ?? newShape.x; // Координата X верхнього лівого кута
        const y = yParam ?? newShape.y; // Координата Y верхнього лівого кута
        const width = newShape.width; // Ширина чотирикутника
        const height = newShape.height; // Висота чотирикутника
        const color = 'blue'; // Колір чотирикутника
        const lineWidth= 2

        // Малюємо чотирикутник
        // ctx.strokeStyle = color
        // ctx.lineWidth = lineWidth; // Встановлюємо колір заливки
        ctx.strokeRect(x, y, width, height); // Малюємо заповнений чотирикутник
        // ctx.fillStyle = '#61dafb30'
        shapes.current.push(newShape)
        // ctx.save()
    }

    const findShapeById = (id:number):undefined |Shape=>{
        return  shapes.current.find(shape=>shape.id===id)
    }
    const replaceShapeById = (id:number,shapeParam:Shape):Shape[]=>{
        shapes.current.filter(shape=>shape.id === id)
        shapes.current.push(shapeParam)
        return shapes.current
        // return shapes.current.map(shape=>shape.id===id?shapeParam:shape)
    }
    const movedShapeId = useRef<number>()

    const moveShape = (x:number,y:number,id:number)=>{
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }
        // canvas.x(x,y)
        console.log(`moving`,x,y)

        // ctx.moveTo(x,y)
        const shape = findShapeById(id)
        if(!shape){
            return;
        }
        const oldShape = {...shape}
        ctx.clearRect(
            oldShape.x,
            oldShape.y,
            oldShape.width,
            oldShape.height
        )
        // const newShape = {...shape}
        shape.x = shape.x + x
        shape.y = shape.y + y
        createShape(shape.x,shape.y)
        replaceShapeById(id,shape)
        // ctx.transform(x,y)
        }


    const isClickWithinRectangle = (clickX: number, clickY: number, rectangle: Shape): boolean => {
        return (
            clickX >= rectangle.x &&
            clickX <= rectangle.x + rectangle.width &&
            clickY >= rectangle.y &&
            clickY <= rectangle.y + rectangle.height
        );
    };


    useEffect(()=>{
        const canvas = canvasRef.current;

        // @ts-ignore
        canvas.width = window.innerWidth;
        // @ts-ignore
        canvas.height = window.innerHeight;

    },[])

    useEffect(()=>{
        createShape()
        setInterval(()=>{
            // setState(Math.random())
            return;
            let firtShape = shapes.current[0]
            if(firtShape?.id){
                moveShape(11,11,firtShape.id)
            }
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!ctx) {
                return;
            }
            // ctx.translate(11,21)
        },201)
    },[])


    const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Перевіряємо кожен чотирикутник
        const clickedShape =  shapes.current.find((rectangle) => {
            return isClickWithinRectangle(clickX, clickY, rectangle)
        });
        if(!clickedShape){
            return;
        }
        movedShapeId.current = clickedShape.id
    };

    const onMouseMoveHandler = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
        if(!movedShapeId.current){
            return
        }
        const shape = findShapeById(movedShapeId.current)
        if(!shape){
            return;
        }
        moveShape(event.movementX,event.movementY,shape.id)
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}> header
            <div
                className={classes.createShape}
                onClick={e=>createShape()}
            >
                Create shape
            </div>
            </div>
            <canvas
                onMouseMove={event=>onMouseMoveHandler(event)}
                onMouseDown={handleCanvasMouseDown}
                ref={canvasRef}

                className={classes.shapesContainer}
            >
{/*
                {shapes.map((shape)=>(
                    <ShapeComponent key={shape.id} shape={shape}/>
                ))}
*/}
            </canvas>

        </div>
    );
};

export default Dashboard;
