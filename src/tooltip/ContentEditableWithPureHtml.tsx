import * as React from "react";
import {useState} from "react";
import ContentEditable from 'react-contenteditable';
import {analyzeTokens, lexer} from "./Lexer";


export default function ContentEditableWithPureHtml() {
    const [html, setHtml] = useState('Start typing <b>here</b>');

    const handleChange = (newHtml: string) => {
        const pureText = newHtml
            .replace(/<button .+>.+<\/button>/g, '')
            .replace(/<.+?>/g, '')
            .replace(/&nbsp;/g, '');


        const tokens = analyzeTokens(lexer(pureText), new Set(['dog', 'cat']));

        const processedHtml = tokens.map((token) => {
            switch (token.type) {
                case "text":
                case "whitespace":
                    return token.value;
                case "highlight":
                    return `<b>${token.value}</b>`
            }
        }).reduce((left, right) => left + right);

        setHtml(processedHtml + "<button onclick='console.log(42)'>Click</button>");
    };

    return <div>
        <h3>Content editable with plain html inside</h3>
        <ContentEditable html={html}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}/>
    </div>
}