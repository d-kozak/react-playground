import * as React from "react";
import "./dragdrop.css";

const DragAndDrop = () => {
    return <div>
        <h1>Drag and drop</h1>
        <p>Experiment trying to implement simle drag and drop feature</p>
        <MovableElem/>
    </div>
};


interface MovableElemState {
    currentTopLeftCornerPosition: [number, number],
    previousMousePosition: [number, number]
    isDragged: boolean
}

class MovableElem extends React.Component<{}, MovableElemState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentTopLeftCornerPosition: [500, 250],
            previousMousePosition: [500, 250],
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
        top: this.state.currentTopLeftCornerPosition[1] + 'px'
    });

    render() {
        return <div
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            style={this.getPositionAsCssStyle()}
            className="movable-elem">
            <h1>Elem</h1>
            <p>Drag me around :)</p>
        </div>;
    }

}

export default DragAndDrop;