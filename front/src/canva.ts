// import {Shape} from "./components/dashboard/Dashboard";

type ValueType = {
    text:string
}

export type Shape = {
    id:number
    x:number,
    y:number,
    type:string
    width:number
    height:number
    value:ValueType
    // text?:string
    // backgroundColor:string,
    z:number,
    // line:number
}

const newShape:Shape = {
    id:Date.now(),
    x:50,
    y:50,
    type:'squere',
    width:100,
    height:100,
    z:1,
    // backgroundColor:'red',
    value:{text:''},
    // line:2
}
const getNewShape =  (id?:number)=>{
    return {...newShape,id:(id?? Date.now())}
}

export class Canva {
    defaultShape:Shape = {
        id:Date.now(),
        x:50,
        y:50,
        type:'squere',
        width:100,
        height:100,
        z:1,
        // backgroundColor:'red',
        value:{text:'default text'},
        // line:2
    }
    movedShapeId:  React.MutableRefObject<number | undefined>
    activeShapeId:   React.MutableRefObject<number | undefined>
    shapes: React.MutableRefObject<Shape[]>
    canvasRef: React.RefObject<HTMLCanvasElement>

    constructor(
        canvasRef: React.RefObject<HTMLCanvasElement>,
        shapes: React.MutableRefObject<Shape[]>,
        movedShapeId:  React.MutableRefObject<number | undefined>,
        activeShapeId:   React.MutableRefObject<number | undefined>
    ) {
        this.canvasRef = canvasRef
        this.shapes = shapes
        this.movedShapeId = movedShapeId
        this.activeShapeId =activeShapeId
    }
    getShapes = ()=>{
        return this.shapes.current
    }
    createShape = (xParam?:number,yParam?:number,text?:string,id?:number)=> {

        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }
        const newShape = getNewShape(id)
        newShape.value.text  = text ||newShape.value.text
        const x = xParam ?? newShape.x; // Координата X верхнього лівого кута
        const y = yParam ?? newShape.y; // Координата Y верхнього лівого кута
        const width = newShape.width; // Ширина чотирикутника
        const height = newShape.height; // Висота чотирикутника
        const color = 'blue'; // Колір чотирикутника
        const lineWidth= 2

        // Малюємо чотирикутник
        // ctx.strokeStyle = color
        ctx.lineWidth = lineWidth; // Встановлюємо колір заливки
        ctx.strokeRect(x, y, width, height); // Малюємо заповнений чотирикутник
        ctx.fillStyle = '#61dafb30'
        if(newShape.value.text){
            // console.log(newShape.text)
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(newShape.value.text, x + width / 2, y + height / 2);
        }
        // this.shapes.current.push(newShape)
        this.replaceStateShapeById(newShape.id,newShape)

        return newShape
        // ctx.save()
    }
    findShapeById =(id?:number):undefined |Shape =>{
        if(!id){
            return undefined
        }

        return  this.shapes.current.find(shape=>shape.id===id)
    }
    replaceStateShapeById  = (id:number, shapeParam:Shape):Shape[] => {
        this.shapes.current = this.shapes.current.filter(shape => shape.id !== id)
        this.shapes.current.push(shapeParam)
        return this.shapes.current
    }
    clearShapeById = (id?:number) =>{
        if(!id){
            return;
        }
        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }
        const shape = this.findShapeById(id)
        if(!shape){
            return;
        }
        ctx.clearRect(
            shape.x-1,
            shape.y-1,
            shape.width+3,
            shape.height+3
        )
    }
    moveShape = (x:number,y:number,id:number) => {
        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            return;
        }
        // console.log(`moving`,x,y)
        const shape = this.findShapeById(id)
        if(!shape){
            return;
        }
        const oldShape = {...shape}
        // const newShape = {...shape}
        shape.x = shape.x + x
        shape.y = shape.y + y


        ctx.clearRect(
            oldShape.x-1,
            oldShape.y-1,
            oldShape.width+3,
            oldShape.height+3
        )

        const newShape  = this.createShape(shape.x,shape.y,shape.value.text,oldShape.id)
        this.replaceStateShapeById(id,shape)

    }
    isClickWithinRectangle = (clickX: number, clickY: number, rectangle: Shape): boolean =>{
        return (
            clickX >= rectangle.x &&
            clickX <= rectangle.x + rectangle.width &&
            clickY >= rectangle.y &&
            clickY <= rectangle.y + rectangle.height
        );
    };
    handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)  =>{

        const canvas = this.canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Перевіряємо кожен чотирикутник
        const clickedShape =  this.shapes.current.find((rectangle) => {
            return this.isClickWithinRectangle(clickX, clickY, rectangle)
        });
        if(!clickedShape){
            return;
        }
        this.movedShapeId.current = clickedShape.id
    };
    onMouseMoveHandler = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(!this.movedShapeId.current){
            return
        }
        const shape = this.findShapeById(this.movedShapeId.current)
        if(!shape){
            return;
        }
        this.moveShape(event.movementX,event.movementY,shape.id)
    }
    handleMouseUp =(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
        const canvas = this.canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Перевіряємо кожен чотирикутник
        const clickedShape =  this.shapes.current.find((rectangle) => {
            return this.isClickWithinRectangle(clickX, clickY, rectangle)
        });
        if(!clickedShape){
            return;
        }
        this.movedShapeId.current = undefined

    }
    onClickHandler  =(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=> {
        const canvas = this.canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const rects = canvas.getClientRects();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Перевіряємо кожен чотирикутник
        const clickedShape =  this.shapes.current.find((rectangle) => {
            return this.isClickWithinRectangle(clickX, clickY, rectangle)
        });
        if(!clickedShape){
            return;
        }
        this.activeShapeId.current = clickedShape.id
    }
    onPressKeyHandler=(event: KeyboardEvent)=>{

        this.clearShapeById(this.activeShapeId.current)
        const shape = this.findShapeById(this.activeShapeId.current)
        if(!shape){
            return
        }
        shape.value.text = (shape.value.text||'') + event.key
        this.createShape(shape.x,shape.y,shape.value.text,shape.id)
        this.replaceStateShapeById(shape.id,shape)
    }
}
