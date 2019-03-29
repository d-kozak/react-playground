import * as React from "react";
import {useState} from "react";
import Editor from "react-simple-code-editor";
import * as ReactTooltip from "react-tooltip";
import Popup from "reactjs-popup";
import {analyzeTokens, lexer} from "../tooltip/Lexer";
import StateDebugger from "../utils/StateDebugger";

import './styles.css';

const HIghlightingAndTooltipsEditor = () => {
    const [code, setCode] = useState('One ring to rule them all');
    const [wordsToHighlight, setWordsToHighlights] = useState(['ring', 'all']);

    const addToHighlights = (word: string) => {
        setWordsToHighlights([...wordsToHighlight, word])
    };

    const removeFromHighlights = (wordToRemove: string) => {
        setWordsToHighlights(wordsToHighlight.filter(word => wordToRemove != word))
    };

    const processCode = (code: string) => {
        const tokens = analyzeTokens(lexer(code), new Set(wordsToHighlight));

        return tokens.map((token, index) => {
            switch (token.type) {
                case "text":
                    return <Popup key={index} trigger={<span>{token.value}</span>} position="right center">
                        <button onClick={() => addToHighlights(token.value)}>Highlight the word {token.value}</button>
                    </Popup>;
                case "whitespace":
                    return token.value;
                case "highlight":
                    return <Popup key={index} trigger={<b>{token.value}</b>} position="right center">
                        <button onClick={() => removeFromHighlights(token.value)}>Don't highlight the
                            word {token.value}</button>
                    </Popup>;
            }
        });
    };

    // @ts-ignore
    // @ts-ignore
    return <div>
        <h3 data-tip={true} data-for="ttt">Highlighting customizable with tooltips</h3>
        <ReactTooltip className="extraClass" delayHide={500} id="ttt" place="top" type="dark">
            <h1>hello!</h1>
            <p>foo</p>
            <h3>bar</h3>
            <button>Click me</button>
        </ReactTooltip>
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => processCode(code)}
            padding={10}
            autoFocus={false}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "#fff",
                border: "solid 1px"
            }}
        />

        <textarea style={{...styles.textarea}} value={code} onChange={e => setCode(e.target.value)}/>
        <pre style={{...styles.editor}}>
            {processCode(code)}
        </pre>

        <StateDebugger state={wordsToHighlight} title="Editor state"/>
    </div>;

};
export default HIghlightingAndTooltipsEditor;


const styles = {
    textarea: {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        color: 'inherit',
        overflow: 'hidden',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        WebkitTextFillColor: 'transparent',
    },
    highlight: {
        position: 'relative',
        pointerEvents: 'none',
    },
    editor: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        borderTop: 0,
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
        background: 'none',
        display: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontVariantLigatures: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        tabSize: 'inherit',
        textIndent: 'inherit',
    },
};
