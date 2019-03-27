import * as React from "react";
import {useState} from "react";
import Editor from 'react-simple-code-editor';

const defaultCode = `A cat and a dog are friends`;

export default function EditorComponent() {
    const [code, setCode] = useState(defaultCode);

    return <div>
        <h1>Editor</h1>
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => code}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />

    </div>
}