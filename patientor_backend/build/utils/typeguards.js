"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryGuard = exports.patientGuard = void 0;
const types_1 = require("../types");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (text) => {
    return typeof text === 'number';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
exports.patientGuard = (patientToPost) => {
    if (!patientToPost.name || !isString(patientToPost.name)) {
        console.log('Error name');
        return false;
    }
    else if (!patientToPost.dateOfBirth || !isDate(patientToPost.dateOfBirth)) {
        console.log('Error date of birth');
        return false;
    }
    else if (!patientToPost.gender || !isGender(patientToPost.gender)) {
        console.log('Error gender');
        return false;
    }
    else if (!patientToPost.occupation || !isString(patientToPost.occupation)) {
        console.log('Error occupation');
        return false;
    }
    else if (patientToPost.id) {
        console.log('Error id');
        return false;
    }
    else {
        return true;
    }
};
exports.entryGuard = (entryToPost) => {
    console.log('entryToPost :>> ', entryToPost);
    if (!entryToPost.date || !isString(entryToPost.date)) {
        console.log('date missing');
        return false;
    }
    else if (!entryToPost.type || !isString(entryToPost.type)) {
        console.log('type missing');
        return false;
    }
    else if (!entryToPost.specialist || !isString(entryToPost.specialist)) {
        console.log('specialist missing');
        return false;
    }
    else if (entryToPost.diagnosisCodes && !Array.isArray(entryToPost.diagnosisCodes)) {
        console.log('diagnosiscodes malformated');
        return false;
    }
    else if (!entryToPost.description || !isString(entryToPost.description)) {
        console.log('description missing');
        return false;
    }
    else if (entryToPost.employerName || !isString(entryToPost.specialist)) {
        console.log('employername malformated');
        return false;
    }
    else if (entryToPost.sickLeave
        && entryToPost.sickLeave.startDate
        && entryToPost.sickLeave.endDate
        && !isString(entryToPost.sickLeave.startDate)
        && !isString(entryToPost.sickLeave.endDate)) {
        console.log('sickLeave malformated');
        return false;
    }
    else if (entryToPost.discharge
        && entryToPost.discharge.date
        && entryToPost.discharge.criteria
        && !isString(entryToPost.discharge.date)
        && !isString(entryToPost.discharge.criteria)
        && !Array.isArray(entryToPost.discharge)) {
        console.log('discharge malformated');
        return false;
    }
    else if (entryToPost.healthCheckRating && !isNumber(entryToPost.healthCheckRating)) {
        console.log('healthCheckRating malformated');
        return false;
    }
    else if (entryToPost.id) {
        console.log('id on post');
        return false;
    }
    else {
        return true;
    }
};
