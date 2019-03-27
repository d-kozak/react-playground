import * as React from "react";
import {useState} from "react";

export default function TextareaWithExtraTooltip() {
    const [text, setText] = useState();

    return <div>
        <h3>Text area example 1</h3>
        <textarea value={text} onChange={e => setText(e.target.value)}/>

        <p>The text you wrote is "{text}"</p>
    </div>
}