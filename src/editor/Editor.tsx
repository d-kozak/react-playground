import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import Editor from 'react-simple-code-editor';
import * as Yup from 'yup';
import StateDebugger from "../formik/StateDebugger";
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
            render={({values, submitForm, handleChange, handleBlur, isValid}) => <Form>
                <FieldArray name="wordsToHighlight" render={({push, remove}) => <div>
                    {values.wordsToHighlight.map((word, index) => <div key={index}>
                        <input type="text" name={`wordsToHighlight.${index}`} value={word} onChange={(e) => {
                            handleChange(e);
                            setTimeout(submitForm, 100)
                        }} onBlur={(e) => {
                            handleBlur(e);
                            submitForm();
                        }}/>
                        <ErrorMessage name={`wordsToHighlight.${index}`}/>
                        <button type="button" onClick={() => {
                            remove(index);
                            setTimeout(submitForm, 100)
                        }}>-
                        </button>
                    </div>)
                    }
                    <button type="button" onClick={() => push('')}>Add new</button>
                    <StateDebugger state={{
                        ...values,
                        isValid
                    }} title="Form state"/>
                </div>
                }/>
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
        <p>This editor automatically bolds specified set a words. You can change this set in the settings.</p>
        <p>The editor is implemented using react-simple-code-editor and the form is implemented using Formik.</p>
        <p>To make the 'autosubmit' (the changes in the form are immeditally propagated to the state of the editor),
            I ended up using normal input tag instead of Formik's Field component and also I had to use setTimeout to
            execute
            the submitForm() function. For some reason it did not work when I fired the form submission immediatelly
            after
            firing handleChange() or remove()...Maybe because of some asynchronous validation? :X</p>
        <p>Maybe this is one of the use cases when using Formik is not beneficial and it would have been easier to just
            write
            all the form handling myself. In this example, it might have been easier. Nevertheless I consider Formik a
            great
            library for most forms.</p>
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
                backgroundColor: "#fff",
                border: "solid 1px"
            }}
        />
        <StateDebugger state={wordsToHighlight} title="Editor state"/>
    </div>
}