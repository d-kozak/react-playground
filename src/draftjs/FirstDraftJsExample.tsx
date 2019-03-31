import * as Draft from "draft-js";
import * as React from "react";
import {CSSProperties, useState} from "react";
import StateDebugger from "../utils/StateDebugger";

const styles: CSSProperties = {
    border: "solid 1px"
};

const regexStrategy = (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
    const text = block.getText();
    let result: RegExpExecArray;
    let regex = /(^|\s)#\w+/g;
    while ((result = regex.exec(text) as RegExpExecArray) != null) {
        let start = result.index;
        let end = start + result[0].length;
        callback(start, end);
    }
};

// const regexComponent = (props:any) => <span style={{ backgroundColor: "lightgreen" }}>{props.children}</span>;
const regexComponent = (props: any) => <b>{props.children}</b>;

const compositeDecorator = new Draft.CompositeDecorator([
    {
        strategy: regexStrategy,
        component: regexComponent
    }
]);

const FirstDraftJsExample = () => {
    const [editorState, setEditorState] = useState(Draft.EditorState.createEmpty(compositeDecorator));


    return <div>
        <h1>DraftJs</h1>
        <div style={styles}>
            <Draft.Editor editorState={editorState} onChange={setEditorState}/>
        </div>
        <StateDebugger state={editorState} title="Editor state"/>
    </div>
};

export default FirstDraftJsExample;