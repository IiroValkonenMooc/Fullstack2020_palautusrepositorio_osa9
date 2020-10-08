import express from "express";
import { patientGuard } from "../../utils/patientguard";
const router = express.Router();
import { getPatientsNoSsn, addPatient, getPatients } from '../services/patientsService';
import { Patient } from '../types';

type FoundPatient = Patient | undefined;

router.get('/:id', (reg, res) => {
    const id = reg.params.id;
    const patients = getPatients();
    let foundPatient: FoundPatient =  patients.find(patient => patient.id == id);

    if(foundPatient && !foundPatient.entries){
        foundPatient.entries = [];
    }

    res.json(foundPatient);
});

router.get('/', (_reg, res) => {
    const patients = getPatientsNoSsn();
    res.json(patients);
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