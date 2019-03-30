import {CompositeDecorator, Editor, EditorState} from 'draft-js';
import * as React from "react";
import Popup from "reactjs-popup";
import StateDebugger from "../utils/StateDebugger";


export interface Props {

}

export interface State {
    editorState: EditorState
    highlightedWords: Array<string>
}

class DraftJsExperiment extends React.Component<Props, State> {
    editor: Editor;

    constructor(props: Props) {
        super(props);
        this.state = {
            highlightedWords: ['const', 'let'],
            editorState: EditorState.createEmpty(new CompositeDecorator([
                {
                    strategy: (contentBlock, callback) => {
                        if (this.state.highlightedWords.length == 0) {
                            return;
                        }
                        const regex = this.createBoldRegex();
                        const text = contentBlock.getText();
                        let matchArr, start;
                        while ((matchArr = regex.exec(text)) !== null) {
                            start = matchArr.index;
                            callback(start, start + matchArr[0].length);
                        }
                    },
                    component: (props: any) => <Popup trigger={<b {...props}>{props.children}</b>}
                                                      position="right center" on="hover">
                        <button onClick={() => this.stopHighlightingWord(props.decoratedText)}>Stop highlighting this
                            word
                        </button>
                    </Popup>
                }
            ]))
        };
    }

    stopHighlightingWord(word: string) {
        this.setState((prevState, props) => ({
            highlightedWords: prevState.highlightedWords.filter(elem => word != elem)
        }), () => {
            console.log(`highlighting for ${word} should be off by now...`);
        });
    }

    createBoldRegex(): RegExp {
        console.log('regex created');
        return new RegExp(this.state.highlightedWords.reduce((left, right) => `${left}|${right}`), "g");
    }

    onChange = (editorState: EditorState) => this.setState({editorState});

    setEditor = (editor: Editor) => {
        this.editor = editor;
    };

    focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
    };

    render() {
        return <div>
            <h1>Draft.js experiment</h1>
            <p>Experiment with draftjs editor</p>
            <div style={styles.editor} onClick={this.focusEditor}>
                <Editor
                    ref={this.setEditor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
            <StateDebugger state={this.state} title="Editor state"/>
        </div>;
    }
}

const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '6em'
    }
};

export default DraftJsExperiment;