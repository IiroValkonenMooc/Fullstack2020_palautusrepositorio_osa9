export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface PatientMoreInfo {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<OccupationalHealthCareEntry | HospitalEntry>
}

interface HealthCareEntryBase {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  description: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
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
  healthCheckRating?: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface RouteMatchId {
  id?: string;
}
