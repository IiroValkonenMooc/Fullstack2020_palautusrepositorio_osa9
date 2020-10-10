import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from '../AddPatientModal/FormField';
import { HospitalEntry, Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const OccupationalHealthcareForm: React.FC<{showForm: Function} & { patient: Patient}>  = ({ showForm, patient }) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async(values: any) => {
        console.log('submit');
        console.log('dataToSubmit :>> ', values);
        console.log('patient :>> ', patient);
        const { diagnosisCodes, sickLeaveBeginDate, sickLeaveEndDate, ...rest } = values;
        const dataTosend: HospitalEntry = {
            ...rest,
            sickLeave: {
                startDate: sickLeaveBeginDate,
                endDate: sickLeaveEndDate
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
                type: 'OccupationalHealthcare',
                date: "20124-01-02",
                specialist: "ASD",
                diagnosisCode: "123",
                description: "weird guy",
                sickLeaveBeginDate: '13',
                sickLeaveEndDate: '14'
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
                if (!values.diagnosisCode) {
                    errors.diagnosisCodes = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                
                if(values.sickLeaveBeginDate && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(values.sickLeaveBeginDate)){
                    errors.sickLeaveBeginDate = 'Invalid date';
                }

                if(values.sickLeaveEndDate && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(values.sickLeaveEndDate)){
                    errors.sickLeaveEndDate = 'Invalid date';
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
                            label="Diagnosis code"
                            placeholder="Diagnosis code"
                            name="diagnosisCode"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave beign date"
                            placeholder="Sick leave beign date"
                            name="sickLeaveBeginDate"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave enddate"
                            placeholder="Sick leave enddate"
                            name="sickLeaveEndDate"
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

export default OccupationalHealthcareForm;