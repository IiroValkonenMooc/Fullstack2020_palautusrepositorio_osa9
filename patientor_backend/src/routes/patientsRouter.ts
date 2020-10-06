import express from "express";
import { patientGuard } from "../../utils/patientguard";
const router = express.Router();
import { getPatientsNoSsn, addPatient } from '../services/patientsService';

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