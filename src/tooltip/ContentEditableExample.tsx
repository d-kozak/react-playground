import * as React from "react";
import {useState} from "react";
import {analyzeTokens, lexer} from "./Lexer";

export default function ContentEditableExample() {

    const [txt, setTxt] = useState('');

    const handleChange = (newText: string) => {
        console.log(newText);
        const tokens = analyzeTokens(lexer(newText), new Set(['dog', 'cat']));

        const txt = tokens.map((token) => {
            switch (token.type) {
                case "text":
                case "whitespace":
                    return token.value;
                case "highlight":
                    return `<b>${token.value}</b>`
            }
        }).reduce((left, right) => left + right);

        setTxt(txt);
    };

    return <div>
        <h3>Type any text in, words dog and cat will be highlighted</h3>
        <h1>Not working, because content editable components should not contain react managed children</h1>
        <p>https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable</p>
        <div contentEditable={true} onInput={e => handleChange(e.currentTarget.textContent!)}>
            {txt}
        </div>
    </div>;
};