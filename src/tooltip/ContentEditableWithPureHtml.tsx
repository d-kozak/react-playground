import * as React from "react";
import {useState} from "react";
import ContentEditable from 'react-contenteditable';
import {analyzeTokens, lexer} from "./Lexer";


export default function ContentEditableWithPureHtml() {

    /**
     * a very hacky example how to pass a function with a bit of context using global window object
     */
    const answer = 42;
    // @ts-ignore
    window.printAnswer = () => console.log(`The answer is ${answer}`);

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

        // here we can call the function, which has access to local variables in the ContentEditableWithPureHtml function/component
        setHtml(processedHtml + "<button onclick='window.printAnswer()'>Click</button>");
    };

    return <div>
        <h3>Content editable with plain html inside</h3>
        <ContentEditable html={html}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}/>
    </div>
}