import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from '../AddPatientModal/FormField';
import { HospitalEntry, Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const HealthCheckForm: React.FC<{showForm: Function} & { patient: Patient}>  = ({ showForm, patient }) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async(values: any) => {
        console.log('submit');
        console.log('dataToSubmit :>> ', values);
        console.log('patient :>> ', patient);
        const { diagnosisCodes, dischargeDate, dischargeCriteria, ...rest } = values;
        const dataTosend: HospitalEntry = {
            ...rest,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            },
            diagnosisCodes: [diagnosisCodes]
        };

        await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`, dataTosend);
    };

    const onCancel = () => {
        showForm(0);
        console.log('canceled');
    };

    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                date: "20124-01-02",
                specialist: "ASD",
                description: "weird guy",
                healthCheckRating: ""
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                } else if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(values.date)) {
                    errors.date = 'Invalid date';
                }

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                if (!values.description) {
                    errors.description = requiredError;
                }
                
                if(values.healthCheckRating && !/^[0-3]$/.test(values.healthCheckRating)){
                    errors.healthCheckRating = 'Invalid healthCheckRating';
                }

                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Health check rating"
                            placeholder="Health check rating"
                            name="healthCheckRating"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default HealthCheckForm;