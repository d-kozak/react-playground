import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import Editor from 'react-simple-code-editor';
import * as Yup from 'yup';
import {analyzeTokens, lexer} from "../tooltip/Lexer";

/**
 * javascript Set does not support functional filter, map etc operations, therefore I use a normal array
 */

const defaultCode = `A cat and a dog are friends`;


const HighlighForm = ({wordsToHighlight, setWordsToHighlight}: { wordsToHighlight: Array<string>, setWordsToHighlight: Dispatch<SetStateAction<Array<string>>> }) => {
    return <div>
        <h3>Highlighting settings</h3>
        <Formik
            initialValues={{wordsToHighlight}}
            onSubmit={(values, actions) => {
                setWordsToHighlight(values.wordsToHighlight);
                actions.setSubmitting(false);
            }}
            validationSchema={Yup.object({
                wordsToHighlight: Yup.array(
                    Yup.string().required('Empty words not allowed')
                )
            })}
            render={({values, isSubmitting}) => <Form>
                <FieldArray name="wordsToHighlight" render={({push, remove}) => <div>
                    {values.wordsToHighlight.map((word, index) => <div key={index}>
                        <Field name={`wordsToHighlight.${index}`}/>
                        <ErrorMessage name={`wordsToHighlight.${index}`}/>
                        <button type="button" onClick={() => remove(index)}>-</button>
                    </div>)
                    }
                    <button type="button" onClick={() => push('')}>Add new</button>
                </div>
                }/>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
            }
        />
    </div>
};

export default function EditorComponent() {
    const [code, setCode] = useState(defaultCode);
    const [wordsToHighlight, setWordsToHighlight] = useState(['dog', 'cat']);

    const processCode = (code: string) => {

        const tokens = analyzeTokens(lexer(code), new Set(wordsToHighlight));

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

    return <div>
        <h1>Editor with highlighting</h1>
        <HighlighForm wordsToHighlight={wordsToHighlight} setWordsToHighlight={setWordsToHighlight}/>
        <h3>Text editor</h3>
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