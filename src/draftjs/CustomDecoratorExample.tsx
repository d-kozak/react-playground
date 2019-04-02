import * as Draft from "draft-js";
import * as Immutable from "immutable";
import * as React from "react";
import {CSSProperties} from "react";
import StateDebugger from "../utils/StateDebugger";

const styles: CSSProperties = {
    border: "solid 1px"
};

export interface State {
    editorState: Draft.EditorState
}

export default class CustomDecoratorExample extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            editorState: Draft.EditorState.createEmpty({
                getComponentForKey(key: string): Function {
                    const originalText = key.split('.')[0];
                    return () => <b>{originalText}</b>;
                },
                getPropsForKey(key: string): any {
                    return {};
                },

                getDecorations(block: any, contentState: any): any {

                    const text = block.getText();
                    const decorations: Array<string | null> = Array(text.length).fill(null);

                    let counter = 0;
                    let result: RegExpExecArray;

                    const regex = /(^|\s)#\w+/g;
                    while ((result = regex.exec(text) as RegExpExecArray) != null) {
                        const start = result.index;
                        const end = start + result[0].length;
                        decorations.fill(result[0] + '.' + counter, start, end);
                        counter++;
                    }

                    console.log(decorations);
                    return Immutable.List(decorations);
                }
            })
        };
    };

    setEditorState = (newState: Draft.EditorState) => this.setState({editorState: newState});

    render() {
        return <div>
            <h1>DraftJs</h1>
            <p>Example using composite decorator</p>
            <p>Unfortunately it is not working now :(</p>
            <div style={styles}>
                <Draft.Editor editorState={this.state.editorState} onChange={this.setEditorState}/>
            </div>
            <StateDebugger state={this.state} title="Editor state"/>
        </div>
    }
};
