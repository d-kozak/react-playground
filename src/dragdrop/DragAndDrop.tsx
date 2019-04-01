import * as React from "react";
import {useState} from "react";
import "./dragdrop.css";

const DragAndDrop = () => {
    return <div>
        <h1>Drag and drop</h1>
        <p>Experiment trying to implement simle drag and drop feature</p>
        <MovableElem/>
    </div>
};


const MovableElem = () => {
    const [position, setPosition] = useState({
        top: "250px",
        left: "500px"
    });

    const [isDragged, setIsDragged] = useState(false);


    const handleDrag = (e: any) => {

        const {clientX, clientY} = e;
        console.log(clientX);
        console.log(clientY);

        const {top, left} = e.target.style;
        console.log(top);
        console.log(left);

        console.log(`Setting position to [${clientX},${clientY}]`);
        setPosition({
            top: `${clientY}px`,
            left: `${clientX}px`
        });

    };


    return <div
        onMouseDown={e => setIsDragged(true)}
        onMouseUp={e => setIsDragged(false)}
        onMouseMove={e => {
            if (isDragged) {
                handleDrag(e);
            }
        }}
        style={position}
        className="movable-elem">
        <h1>Elem</h1>
    </div>
};


export default DragAndDrop;