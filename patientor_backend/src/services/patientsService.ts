import { Patient, PatientNoSensitiveInfo, newPatient, Entry, newEntry } from './../types';
import patients from '../data/patients';

export const getPatients = (): Array<Patient> => {
    // return patients as Array<Patient>;
    return patients;
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
    const idForPatient: number =  patients.length+1;
    const patientToAdd:Patient = {
        ...newPatient,
        id: idForPatient.toString()
    };

    patients.push(patientToAdd);

    return patientToAdd;
};

export const addEntryToPatients = (newEntry: newEntry, patient: Patient): Entry => {
    const idForEntry: number =  patient.entries.length+1;
    const entryToPost: Entry = {
        ...newEntry,
        id: idForEntry.toString()
    };

    patient.entries.push(entryToPost);

    return entryToPost;
};