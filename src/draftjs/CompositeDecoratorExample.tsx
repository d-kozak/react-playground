import * as Draft from "draft-js";
import * as React from "react";
import {CSSProperties} from "react";
import StateDebugger from "../utils/StateDebugger";


const styles: CSSProperties = {
    border: "solid 1px"
};

const regexComponent = (props: any) => <b>{props.children}</b>;

export interface State {
    editorState: Draft.EditorState
}

export default class CompositeDecoratorExample extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        const compositeDecorator = new Draft.CompositeDecorator([
            {
                strategy: this.regexStrategy,
                component: regexComponent
            }
        ]);
        this.state = {
            editorState: Draft.EditorState.createEmpty(compositeDecorator)
        };
    };

    regexStrategy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
        const text = block.getText();
        let result: RegExpExecArray;
        let regex = /(^|\s)#\w+/g;
        while ((result = regex.exec(text) as RegExpExecArray) != null) {
            let start = result.index;
            let end = start + result[0].length;
            callback(start, end);
        }
    };

    setEditorState = (newState: Draft.EditorState) => this.setState({editorState: newState});

    render() {
        return <div>
            <h1>DraftJs</h1>
            <p>Example using a composite decorator</p>
            <p>It makes any words starting with # <b>bold</b></p>
            <div style={styles}>
                <Draft.Editor editorState={this.state.editorState} onChange={this.setEditorState}/>
            </div>
            <StateDebugger state={this.state} title="Editor state"/>
        </div>
    }
};
