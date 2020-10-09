import { Gender } from './../src/types';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: any): text is number => {
    return typeof text === 'number';
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
};

export const patientGuard = (patientToPost: any) => {
    if(!patientToPost.name || !isString(patientToPost.name)){
        console.log('Error name');
        return false;
    } else if (!patientToPost.dateOfBirth || !isDate(patientToPost.dateOfBirth)){
        console.log('Error date of birth');
        return false;
    } else if (!patientToPost.gender || !isGender(patientToPost.gender)){
        console.log('Error gender');
        return false;
    } else if (!patientToPost.occupation || !isString(patientToPost.occupation)){
        console.log('Error occupation');
        return false;
    } else if (patientToPost.id){
        console.log('Error id');
        return false;
    } else {
        return true;
    }
};

export const entryGuard = (entryToPost: any) => {
    if(!entryToPost.id || !isString(entryToPost.id)){
        return false;
    }else if(!entryToPost.date || !isString(entryToPost.date)){
        return false;
    } else if(!entryToPost.type || !isString(entryToPost.type)){
        return false;
    } else if(!entryToPost.specialist || !isString(entryToPost.specialist)){
        return false;
    } else if( entryToPost.diagnosisCodes && !Array.isArray(entryToPost.diagnosisCodes)){
        return false;
    } else if(!entryToPost.description || !isString(entryToPost.description)){
        return false;
    } else if( entryToPost.employerName || !isString(entryToPost.specialist)){
        return false;
    } else if( entryToPost.sickLeave && !Array.isArray(entryToPost.sickLeave)){
        return false;
    } else if( entryToPost.discharge && !Array.isArray(entryToPost.discharge)){
        return false;
    } else if( entryToPost.healthCheckRating && !isNumber(entryToPost.healthCheckRating)){
        return false;
    } else {
        return true;
    }
};