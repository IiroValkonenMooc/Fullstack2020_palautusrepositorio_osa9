/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient, PatientMoreInfo } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatientSingle } from "../state";

const SinglePatient: React.FC<{id: string | undefined}> = ({id}) => {
  const [{ patientsMoreInfo }, dispatch] = useStateValue();
  const [patientToDisplay, setPatientToDisplay] = useState<PatientMoreInfo | null>();

  console.log('patientsMoreInfo :>> ', patientsMoreInfo);
  console.log('patientToDisplay :>> ', patientToDisplay);

  useEffect(() => {
    if(JSON.stringify(patientsMoreInfo) !== '{}'){
      const patientsList = Object.values(patientsMoreInfo).map((patient: PatientMoreInfo) => patient);
      const foundPatient = patientsList.find(patient => patient.id === id);
      if(foundPatient){
        setPatientToDisplay(foundPatient);
      } else {
        axios.get<PatientMoreInfo>(`${apiBaseUrl}/patients/${id}`).then((response) => {
          const sentPatient = response.data;
          if(sentPatient){
            dispatch(addPatientSingle(sentPatient));
            setPatientToDisplay(sentPatient);
          } else {
            setPatientToDisplay(null);
          }
        });
      }
    } else{
      axios.get<PatientMoreInfo>(`${apiBaseUrl}/patients/${id}`).then((response) => {
        const sentPatient = response.data;
        if(sentPatient){
          dispatch(addPatientSingle(sentPatient));
          setPatientToDisplay(sentPatient);
        } else {
          setPatientToDisplay(null);
        }
      });
    }
  }, [id]);

  if (patientToDisplay) {
    return (
      <div className="App">
        <Container textAlign="left">
          <h2>{patientToDisplay.name} ({patientToDisplay.gender})</h2>
          <h3>ssn: {patientToDisplay.ssn} </h3>
          <h3>occupation: {patientToDisplay.occupation} </h3>
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient not found</h3>
      </Container>
      
    </div>
  );
};

export default SinglePatient;
