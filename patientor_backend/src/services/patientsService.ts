import { Patient, PatientNoSensitiveInfo, newPatient } from './../types';
import patients from '../data/patients.json';

export const getPatients = (): Array<Patient> => {
    return patients as Array<Patient>;
};

export const getPatientsNoSsn = (): Array<PatientNoSensitiveInfo> => {
    const patients = getPatients();

    const removeSsn = ( patient: Patient ): PatientNoSensitiveInfo => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...rest } = patient;

        return rest;
    };

    return patients.map(patient => removeSsn(patient));
};

export const addPatient = (newPatient: newPatient): Patient => {
    const idForPatient =  patients.length+1;
    const patientToAdd:Patient = {
        ...newPatient,
        id: idForPatient.toString()
    };

    patients.push(patientToAdd);

    return patientToAdd;
};