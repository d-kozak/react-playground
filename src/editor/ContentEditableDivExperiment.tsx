import * as React from "react";
import StateDebugger from "../utils/StateDebugger";

export interface Props {

}

export interface State {
    code: string
}

export default class ContentEditableDivExperiment extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            code: 'const answer = 42;'
        };

        // @ts-ignore
        window.changeEditorCode = (divInnerHtml: string) => {
            this.setState({
                code: divInnerHtml.replace(/<.+?>/g, '')
                    .replace('&nbsp;', '')
            });
            const mainDiv = document.getElementById('main-div');
            if (mainDiv) {
                console.log('focus!');
                mainDiv.focus();
                // @ts-ignore
                if (window.savedRange) {
                    console.log('focus 2!');
                    const s = window.getSelection();
                    if (s.rangeCount > 0) {
                        s.removeAllRanges();
                    }
                    // @ts-ignore
                    s.addRange(window.savedRange);
                }
            }
        };
        // @ts-ignore
        window.savedRange = undefined;
        // @ts-ignore
        window.isInFocus = false;

        // @ts-ignore
        window.saveSelection = () => {
            // @ts-ignore
            window.savedRange = window.getSelection().getRangeAt(0);
            console.log('saving selection');

        }
    }

    componentWillUnmount(): void {
        // @ts-ignore
        window.changeEditorCode = undefined;
    }

    render() {
        const code = this.state.code.replace('const', '<b>const</b>');

        const contendEditableDiv = `<div id="main-div" contenteditable="true" onmouseup="window.saveSelection()" onkeyup="window.changeEditorCode(innerHTML);window.saveSelection()">${code}</div>`;

        return <div>
            <h1>Experimenting with textarea</h1>
            <p>Experiment to see how much functionality can be achieved by using a content editable div</p>
            <div dangerouslySetInnerHTML={{__html: contendEditableDiv}}/>
            <StateDebugger state={this.state} title="Editor state"/>
        </div>
    }
};


