import { Gender } from './../src/types';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
};

export const patientGuard = (patientToPost: any) => {
    if(!patientToPost.name || !isString(patientToPost.name)){
        return false;
    } else if (!patientToPost.dateOfBirth || !isDate(patientToPost.dateOfBirth)){
        return false;
    } else if (!patientToPost.gender || !isGender(patientToPost.gender)){
        return false;
    } else if (!patientToPost.occupation || !isString(patientToPost.occupation)){
        return false;
    } else if (patientToPost.id){
        return false;
    } else {
        return true;
    }
};