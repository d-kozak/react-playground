import {ErrorMessage, Field, Form, Formik} from "formik";
import * as React from 'react';
import * as Yup from 'yup';
import StateDebugger from "./StateDebugger";

interface NonAutosubmitFormExampleProps {
    login: string
}

interface NonAutosubmitFormExampleState {
    login: string
}

export default class NonAutosubmitFormExample extends React.Component<NonAutosubmitFormExampleProps, NonAutosubmitFormExampleState> {

    constructor(props: NonAutosubmitFormExampleProps) {
        super(props);
        this.state = {
            login: props.login
        }
    }

    render() {
        return <div>
            <h3>Non autosubmit example</h3>
            <p>To propagate the state from Formik up, you have to submit the form using the submit button</p>
            <StateDebugger state={this.state} title="Component state"/>
            <Formik
                initialValues={{login: this.props.login}}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .required('Login is required')
                        .max(10, 'Max 10 characters, please')
                })}
                render={({values, isSubmitting}) =>
                    <Form>
                        <label htmlFor="login">Login</label>
                        <br/>
                        <Field name="login"/>
                        <ErrorMessage name="login"/>
                        <StateDebugger state={values} title="Formik state"/>
                        <button type="submit">Submit</button>
                    </Form>
                }
                onSubmit={(values, actions) => {
                    this.setState({
                        login: values.login
                    });
                    actions.setSubmitting(false);
                }}
            />
        </div>
    };

}



