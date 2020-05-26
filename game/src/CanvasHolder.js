import React, { useRef, useState, useEffect } from 'react';
import {useAnimationFrame} from './customHooks/UseAnimationFrame'
import moment from 'moment'

// let canvas = document.getElementById('my-canvas')
// let ctx = canvas.getContext('2d')

// let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// console.log(imageData)

// let screenBuffer = imageData.data;


let ctx
let imageData


function CanvasHolder(props){


    const canvasRef = useRef(null)
    
   useEffect(() => {

    ctx = canvasRef.current.getContext('2d')
        
    imageData = ctx.getImageData(0,0, canvasRef.current.width, canvasRef.current.height)


   },[])

    
    const doAnimation = (elaspedTime) => {
       
        console.log("elasped Time: ", elaspedTime)
        console.log("current canvasRef: ",canvasRef.current)

        // let screenBuffer = imageData.data
        

        setPixel(imageData, 5, 11, [0xff,0,0,1], ctx)
        setPixel(imageData, 5, 12, [255,0,0,1], ctx)
        setPixel(imageData, 5, 13, [255,0,0,1], ctx)
        setPixel(imageData, 5, 14, [255,0,0,1], ctx)

        for(let i = 0; i < 80; i++){
            setPixel(imageData, 20, i, [255,0,0,1])
        }
        
        const pixelRGBA = getPixel(imageData, 5, 11)
        
        console.log('the pixel data',  pixelRGBA) 

        // console.log(1111111,ctx)

        ctx.putImageData(imageData, 0, 0)


    }

    const getPixel = (imageData, x, y) => {
        const w = imageData.width; // Conveniently the width is here
        const h = imageData.height;

        if (x < 0 || x >= w || y < 0 || y >= h) {
            // Out of bounds
            return null;
        }
    
        // Compute index within the array
        const index = (w * y + x) * 4;
    
        // Return a copy of the R, G, B, and A elements
        return imageData.data.slice(index, index + 4);
    }



    const setPixel = (imageData, x, y, RBGAArray) => {
        
        const w = imageData.width;
        const h = imageData.height;
        
        if (x < 0 || x >= w || y < 0 || y >= h) {
            // Out of bounds
            return null;
        }

        
        let buffer = imageData.data
    
        // Compute index within the array
        const index = (w * y + x) * 4;


        buffer[index] = 255
        buffer[index+1] = 0
        buffer[index+2] = 0
        buffer[index+3] = 1

        
        // console.log('the index place', imageData.data[index])
        // console.log('the index place', imageData.data[index +3])

        ctx.putImageData(imageData, 0, 0)
         
    }



    // const colorRed = (pixel) => {
    //     pixel[0] = 120
    //     pixel[3] = 1
    // }


    const [cancelAnimationFrame] = useAnimationFrame( moment.now(), doAnimation)

    

    // const stopTheAnimation = () =>{
        
    // }
    // const startTheAnimation = () =>{
        
    // }


    return (
        <div className={'redDiv'}>
            <canvas ref={canvasRef} width={props.width} height={props.height}></canvas>

            {/* <button onClick={stopTheAnimation}>Stop</button>
            <button onClick={startTheAnimation}>Start</button> */}
        </div>
       
    )

}

export default CanvasHolder
