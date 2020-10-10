export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Array<Entry>
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientNoSensitiveInfo = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;

export type newEntry = Omit<Entry, 'id'>;

interface HealthCareEntryBase {
    id: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
    description: string;
    healthCheckRating?: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends HealthCareEntryBase {
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string,
    };
} 

export interface HospitalEntry extends HealthCareEntryBase {
    discharge?: {
        date: string,
        criteria: string,
    };
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}