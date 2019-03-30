import {CompositeDecorator, ContentBlock, ContentState, Editor, EditorState} from 'draft-js';
import * as Immutable from "immutable";
import {List} from "immutable";
import * as React from "react";
import Popup from "reactjs-popup";
import {lexer} from "../tooltip/Lexer";
import StateDebugger from "../utils/StateDebugger";


export interface Props {

}

export interface State {
    editorState: EditorState
    highlightedWords: Array<string>
}

const defaultWordsToHighlight = ['const', 'let'];

class DraftJsExperiment extends React.Component<Props, State> {
    editor: Editor;

    constructor(props: Props) {
        super(props);
        const decorator: any = {

            getPropsForKey(key: string): any {
                return 42;
            },
            getComponentForKey(key: string): Function {
                return () => {
                    if (key == '+') {
                        return <span>+</span>;
                    } else if (/^number-\d+$/g.test(key)) {
                        const number = Number(key.split('-')[1]);
                        return <span>{number}</span>
                    }
                    throw new Error(`unknown key ${key}`);
                };
            },
            getDecorations(block: ContentBlock, contentState: ContentState): List<string> {
                const decorations = Array(block.getLength()).fill(null);
                const text = block.getText();
                const tokens = lexer(text);

                let textIndex = 0;
                let tokenIndex = 0;
                while (textIndex < text.length && tokenIndex < tokens.length) {
                    const currentToken = tokens[tokenIndex];
                    if (currentToken == '+') {
                        decorations[textIndex] = '+';
                    } else if (/^\d+$/g.test(currentToken)) {
                        for (let i = textIndex; i < textIndex + currentToken.length; i++) {
                            decorations[i] = `number-${currentToken}`
                        }
                    }
                    textIndex += currentToken.length;
                    tokenIndex++;
                }

                return Immutable.List(decorations);
            }
        };

        this.state = {
            highlightedWords: defaultWordsToHighlight,
            editorState: EditorState.createEmpty(decorator)
        };
    }

    render() {
        return <div>
            <h1>Draft.js experiment</h1>
            <p>Experiment with draftjs editor</p>
            <p>Maybe what I want will be doable in a similar manner to https://github.com/SamyPesse/draft-js-prism and
                https://github.com/withspectrum/draft-js-prism-plugin</p>
            <div style={styles.editor} onClick={() => {
                if (this.editor) {
                    this.editor.focus();
                }
            }}>
                <Editor
                    ref={(editor: Editor) => {
                        this.editor = editor;
                    }}
                    editorState={this.state.editorState}
                    onChange={(editorState: EditorState) => this.setState({editorState})}
                />
            </div>
            <StateDebugger state={this.state} title="Editor state"/>
        </div>;
    }

    private createDecorators(wordsToHighlight: Array<string>) {
        if (wordsToHighlight.length == 0) {
            return new CompositeDecorator([]);
        }
        const boldRegex = new RegExp(wordsToHighlight.reduce((left, right) => `${left}|${right}`), "g");

        const stopHighlightingWord = (word: string) => {
            this.setState((prevState, props) => {
                const highlightedWords = prevState.highlightedWords.filter(elem => word != elem);
                const editorState = EditorState.set(this.state.editorState, {decorator: this.createDecorators(highlightedWords)});
                return {
                    highlightedWords,
                    editorState
                }
            });
        };

        return new CompositeDecorator([
            {
                strategy: (contentBlock, callback) => {
                    const regex = boldRegex;
                    const text = contentBlock.getText();
                    let matchArr, start;
                    while ((matchArr = regex.exec(text)) !== null) {
                        start = matchArr.index;
                        callback(start, start + matchArr[0].length);
                    }
                },
                component: (props: any) => <Popup trigger={<b {...props}>{props.children}</b>}
                                                  position="right center" on="hover">
                    <button onClick={() => stopHighlightingWord(props.decoratedText)}>Stop highlighting
                        word {props.decoratedText}
                    </button>
                </Popup>
            }
        ]);
    }

}

const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '6em'
    }
};

export default DraftJsExperiment;