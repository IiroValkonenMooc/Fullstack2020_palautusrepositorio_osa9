"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntryToPatients = exports.addPatient = exports.getPatientsNoSsn = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../data/patients"));
exports.getPatients = () => {
    // return patients as Array<Patient>;
    return patients_1.default;
};
exports.getPatientsNoSsn = () => {
    const patients = exports.getPatients();
    const removeSsn = (patient) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn } = patient, rest = __rest(patient, ["ssn"]);
        return rest;
    };
    return patients.map(patient => removeSsn(patient));
};
exports.addPatient = (newPatient) => {
    const idForPatient = patients_1.default.length + 1;
    const patientToAdd = Object.assign(Object.assign({}, newPatient), { id: idForPatient.toString() });
    patients_1.default.push(patientToAdd);
    return patientToAdd;
};
exports.addEntryToPatients = (newEntry, patient) => {
    const idForEntry = patient.entries.length + 1;
    const entryToPost = Object.assign(Object.assign({}, newEntry), { id: idForEntry.toString() });
    patient.entries.push(entryToPost);
    return entryToPost;
};
