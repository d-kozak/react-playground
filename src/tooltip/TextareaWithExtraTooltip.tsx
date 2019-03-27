import * as React from "react";
import {useState} from "react";
import {analyzeTokens, lexer, Token} from "./Lexer";

export default function TextareaWithExtraTooltip() {
    const [text, setText] = useState('');

    const [tokens, setTokens] = useState<Token[]>([]);

    const handleChange = (newText: string) => {
        setText(newText);
        const tokens = analyzeTokens(lexer(newText), new Set(['dog', 'cat']));
        setTokens(tokens);
    };

    return <div>
        <h3>Text area example 1</h3>
        <textarea value={text} onChange={(e) => handleChange(e.target.value)}/>

        <p>The text you wrote is "{tokens.map(
            token => {
                switch (token.type) {
                    case "text":
                    case "whitespace":
                        return token.value;
                    case "highlight":
                        return <b>{token.value}</b>
                }
            }
        )}"</p>
    </div>
}