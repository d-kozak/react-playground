import * as React from "react";
import "./dragdrop.css";

const DragAndDrop = () => {
    return <div>
        <h1>Drag and drop</h1>
        <p>Experiment trying to implement simle drag and drop feature</p>
        <p>Draging is implemented by using <b>top</b> and <b>left</b> css properties,
            which are being overwritten in mouse listeners on the div.
            The listeners are MouseDown to start the draging, mouseMove perform the drag and mouseUp to end the dragging
        </p>
        <p>It currently has one drawback, which you can experience if you try to drag one block through another</p>
        <MovableElem background="#28E9F1" initialPosition={[400, 250]}/>
        <MovableElem background="#3FDF32" initialPosition={[75, 400]}/>
        <MovableElem background="#F42CB1" initialPosition={[700, 600]}/>
    </div>
};


interface MovableElemState {
    currentTopLeftCornerPosition: [number, number],
    previousMousePosition: [number, number]
    isDragged: boolean
}

interface MovableElemProps {
    background: string
    initialPosition: [number, number]
}

class MovableElem extends React.Component<MovableElemProps, MovableElemState> {

    constructor(props: MovableElemProps) {
        super(props);
        this.state = {
            currentTopLeftCornerPosition: props.initialPosition,
            previousMousePosition: props.initialPosition,
            isDragged: false
        };
    }

    handleMouseDown = (e: any) => {
        const newX = Number(e.clientX);
        const newY = Number(e.clientY);
        this.setState({
            isDragged: true,
            previousMousePosition: [newX, newY]
        });

    };

    handleMouseUp = (e: any) => {
        this.setState({
            isDragged: false
        });
    };

    handleMouseMove = (e: any) => {
        if (this.state.isDragged) {
            const newX = Number(e.clientX);
            const newY = Number(e.clientY);
            const diffX = newX - this.state.previousMousePosition[0];
            const diffY = newY - this.state.previousMousePosition[1];
            const currentTopLeftCornerPosition: [number, number] = [this.state.currentTopLeftCornerPosition[0] + diffX, this.state.currentTopLeftCornerPosition[1] + diffY];

            this.setState({
                previousMousePosition: [newX, newY],
                currentTopLeftCornerPosition
            });
        }
    };

    getPositionAsCssStyle = () => ({
        left: this.state.currentTopLeftCornerPosition[0] + 'px',
        top: this.state.currentTopLeftCornerPosition[1] + 'px',
        background: this.props.background
    });

    render() {
        return <div
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            style={this.getPositionAsCssStyle()}
            className="movable-elem">
            <h3>Drag me around :)</h3>
        </div>;
    }

}

export default DragAndDrop;