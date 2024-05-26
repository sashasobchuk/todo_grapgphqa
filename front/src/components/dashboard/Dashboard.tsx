import classes from './Dashboard.module.css'
import ShapeComponent from "../shape/ShapeComponent";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import {log} from "util";
import {Canva, Shape} from "../../canva";
// import {useQuery} from "@apollo/client";
import {GET_ALL_SHAPES} from "../query";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_SHAPE} from "../mutation/shape";



// const canva = new Canva()

const Dashboard = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapes = useRef<Shape[]>([])
    const  [newShape] = useMutation<Shape>(CREATE_SHAPE)

    const {data:fethedShapes, loading, error, refetch,} = useQuery<{ getShapes: Shape[] }>(GET_ALL_SHAPES )

    const movedShapeId = useRef<number>()
    const activeShapeId = useRef<number>()
    useEffect(()=>{
        const canvas = canvasRef.current;

        // @ts-ignore
        canvas.width = window.innerWidth;
        // @ts-ignore
        canvas.height = window.innerHeight;

    },[])
    useEffect(()=>{
        // canvaRef.current.createShape()
        setInterval(()=>{
            // setState(Math.random())
            return;
            let firtShape = shapes.current[0]
            if(firtShape?.id){
                canvaRef.current.moveShape(11,11,firtShape.id)
            }
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!ctx) {
                return;
            }
            // ctx.translate(11,21)
        },201)
    },[])
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent): void => {
            console.log(`Key pressed: ${event.key}`);
        };

        window.addEventListener('keypress', canvaRef.current.onPressKeyHandler);

        // Очистка ефекту
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    useEffect(()=>{
        /** fetch first shapes*/
        if(fethedShapes?.getShapes.length){
            shapes.current = fethedShapes.getShapes;
            shapes.current.forEach(shape=>{canva.createShape(shape.x,shape.y,shape.value?.text,shape.id)
            })
        }
    },[fethedShapes])

    const canvaRef = useRef<Canva>(new Canva(canvasRef,shapes,movedShapeId,activeShapeId))
    const canva = canvaRef.current
    const createNewShapeHandler = () => {
      const drawedShape = canva.createShape()
          newShape({
              variables:{
                  x:drawedShape?.x,
                  y:drawedShape?.y,
                  width:drawedShape?.width,
                  height:drawedShape?.height,
              }
          })
    }

    return (
        <div
            className={classes.container}>
            <div className={classes.header}> header
            <div
                className={classes.createShape}
                onClick={createNewShapeHandler}
            >
                Create shape
            </div>
                <div onClick={e=>console.log(canva.getShapes())}>
                    log shapes
                </div>
            </div>
            <canvas
                onClick={canva.onClickHandler}
                onMouseMove={event=>canva.onMouseMoveHandler(event)}
                onMouseDown={canva.handleCanvasMouseDown}
                onMouseUp={e=>canva.handleMouseUp(e)}
                ref={canvasRef}

                className={classes.shapesContainer}
            >
            </canvas>

        </div>
    );
};

export default Dashboard;
