import express from "express";
import { patientGuard, entryGuard } from "../utils/typeguards";
const router = express.Router();
import { getPatientsNoSsn, addPatient, getPatients, addEntryToPatients } from '../services/patientsService';
import { Patient, newEntry } from '../types';

type FoundPatient = Patient | undefined;

router.get('/:id', (reg, res) => {
    const id = reg.params.id;
    const patients = getPatients();
    const foundPatient: FoundPatient =  patients.find(patient => patient.id == id);

    // if(foundPatient && !foundPatient.entries){
    //     foundPatient.entries = [];
    // }

    res.json(foundPatient);
});

router.get('/', (_reg, res) => {
    const patients = getPatientsNoSsn();
    res.json(patients);
});

router.post('/:id/entries', (reg, res) => {
    const id = reg.params.id;
    const patients = getPatients();
    const foundPatient: FoundPatient =  patients.find(patient => patient.id == id);

    if(!foundPatient){
        throw new Error('wring patient id');
    }

    if(!entryGuard(reg.body)){
        throw new Error('Malformatted or missing data');
    }

    const newEntry = reg.body as newEntry;

    const addedEntry = addEntryToPatients(newEntry, foundPatient);

    res.json(addedEntry);
});

router.post('/', (reg, res) => {
    console.log('reg :>> ', reg.body);

    if(!patientGuard(reg.body)){
        throw new Error('Malformatted or missing data');
    }

    const addedpatient = addPatient(reg.body);

    res.json(addedpatient);
});

export default router;