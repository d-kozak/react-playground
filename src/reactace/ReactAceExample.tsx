import * as React from "react";
import AceEditor from "react-ace";

import './styles.css';

export default () => {

    const onChange = (newValue: string) => {
        console.log(newValue);
    };

    return <div>
        <h1>React ace</h1>
        <AceEditor
            value={`Sla nanynka do zeli
            natrhala lupeni, lupenicko
            fakt jo...:)`}
            onChange={onChange}
            annotations={
                [
                    {
                        column: 0, row: 0, text: "My annotation", type: "error"
                    }
                ]
            }
            markers={
                [
                    {
                        startRow: 0, endRow: 2, startCol: 2, endCol: 4, type: "error", className: "error-marker"
                    }
                ]
            }
            editorProps={{$blockScrolling: true}}
        />,
    </div>;
};