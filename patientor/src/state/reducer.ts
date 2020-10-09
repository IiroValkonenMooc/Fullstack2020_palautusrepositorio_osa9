import { State } from "./state";
import { Patient, PatientMoreInfo } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_SINGLE";
      payload: PatientMoreInfo;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_SINGLE":
        return {
          ...state,
          patientsMoreInfo: {
            ...state.patientsMoreInfo,
            [action.payload.id]: action.payload
          }
        };
    default:
      return state;
  }
};

export const addPatientSingle = (patientInfo: PatientMoreInfo): Action => {
  return {
    type: 'ADD_PATIENT_SINGLE',
    payload: patientInfo
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setPatientList = (patientlist: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientlist
  };
};