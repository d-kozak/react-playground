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
                    return <Popup key={index} trigger={<span>{token.value}</span>} position="right center" on="hover">
                        <button onClick={() => addToHighlights(token.value)}>Highlight the word {token.value}</button>
                    </Popup>;
                case "whitespace":
                    return token.value;
                case "highlight":
                    return <Popup key={index} trigger={<b>{token.value}</b>} position="right center" on="hover">
                        <button onClick={() => removeFromHighlights(token.value)}>Don't highlight the
                            word {token.value}</button>
                    </Popup>;
            }
        });
    };

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
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "#fff",
                border: "solid 1px"
            }}
        />

        <pre>
            {processCode(code)}
        </pre>

        <StateDebugger state={wordsToHighlight} title="Editor state"/>
    </div>;

};
export default HIghlightingAndTooltipsEditor;