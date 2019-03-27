import * as React from "react";
import {useState} from "react";
import Editor from 'react-simple-code-editor';
import {analyzeTokens, lexer} from "../tooltip/Lexer";

const defaultCode = `A cat and a dog are friends`;


const processCode = (code: string) => {

    const tokens = analyzeTokens(lexer(code), new Set(['dog', 'cat']));

    const processedHtml = tokens.map((token) => {
        switch (token.type) {
            case "text":
            case "whitespace":
                return token.value;
            case "highlight":
                return `<b>${token.value}</b>`
        }
    }).reduce((left, right) => left + right);

    return processedHtml;
};

export default function EditorComponent() {
    const [code, setCode] = useState(defaultCode);

    return <div>
        <h1>Editor</h1>
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => processCode(code)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />

    </div>
}