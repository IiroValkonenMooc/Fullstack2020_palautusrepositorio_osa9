"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeguards_1 = require("../utils/typeguards");
const router = express_1.default.Router();
const patientsService_1 = require("../services/patientsService");
router.get('/:id', (reg, res) => {
    const id = reg.params.id;
    const patients = patientsService_1.getPatients();
    const foundPatient = patients.find(patient => patient.id == id);
    // if(foundPatient && !foundPatient.entries){
    //     foundPatient.entries = [];
    // }
    res.json(foundPatient);
});
router.get('/', (_reg, res) => {
    const patients = patientsService_1.getPatientsNoSsn();
    res.json(patients);
});
router.post('/:id/entries', (reg, res) => {
    console.log('patients router');
    console.log('reg.body :>> ', reg.body);
    const id = reg.params.id;
    const patients = patientsService_1.getPatients();
    const foundPatient = patients.find(patient => patient.id == id);
    if (!foundPatient) {
        throw new Error('wring patient id');
    }
    if (!typeguards_1.entryGuard(reg.body)) {
        throw new Error('Malformatted or missing data');
    }
    const newEntry = reg.body;
    const addedEntry = patientsService_1.addEntryToPatients(newEntry, foundPatient);
    res.json(addedEntry);
});
router.post('/', (reg, res) => {
    console.log('reg :>> ', reg.body);
    if (!typeguards_1.patientGuard(reg.body)) {
        throw new Error('Malformatted or missing data');
    }
    const addedpatient = patientsService_1.addPatient(reg.body);
    res.json(addedpatient);
});
exports.default = router;
