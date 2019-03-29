import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as React from "react";
import * as Yup from 'yup';
import StateDebugger from "../utils/StateDebugger";

const schema = Yup.object({
    name: Yup.string().max(10).required(),
    surname: Yup.string().max(10).required(),
    phoneNumbers: Yup.array(Yup.string().matches(/\d+/)).min(1, 'At least one phone number, please')
});

export default function FormikExample() {

    return <div>
        <h3>A simple form with formik</h3>
        <Formik
            initialValues={{name: 'John', surname: 'Snow', phoneNumbers: []}}
            validationSchema={schema}
            onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                actions.resetForm({name: 'Arya', surname: 'Stark', phoneNumbers: []})
            }}
            render={({values, isSubmitting}) => {
                return <Form>
                    <label>Name</label>
                    <Field type="text" name="name"/>
                    <br/>
                    <ErrorMessage name="name">
                        {(error) => <h3>Horrible error: {error}</h3>
                        }
                    </ErrorMessage>
                    <label>Surname</label>
                    <Field type="text" name="surname"/>
                    <br/>
                    <ErrorMessage name="surname"/>
                    <label>PhoneNumbers</label>
                    <br/>
                    <FieldArray
                        name="phoneNumbers"
                        render={({remove, insert, push}) =>
                            values.phoneNumbers && values.phoneNumbers.length > 0 ?
                                values.phoneNumbers.map((phoneNumber, index) => <div key={index}>
                                    <Field name={`phoneNumbers.${index}`}/>
                                    <ErrorMessage name={`phoneNumbers.${index}`}/>
                                    <button type="button" onClick={() => insert(index, '')}>+</button>
                                    <button type="button" onClick={() => remove(index)}>-</button>
                                </div>)
                                : <button type="button" onClick={() => push('')}>Add new</button>

                        }
                    />
                    <br/>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                    <StateDebugger state={values} title="Form state"/>
                </Form>
            }}
        />
    </div>;
}


