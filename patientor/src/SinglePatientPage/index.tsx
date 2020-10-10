/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, List, Icon } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient, PatientMoreInfo } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatientSingle } from "../state";
import HospitalEntryForm from '../EntryForm/HospitalEntryForm';
import OccupationalHealthcare from '../EntryForm/OccupationalHealthcare';
import HealthCheckForm from '../EntryForm/HealthCheckForm';

const SinglePatient: React.FC<{id: string | undefined}> = ({id}) => {
  const[showHospitalEntry, setShowHospitalEntry] = useState(0);
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
  console.log('patientToDisplay :>> ', patientToDisplay);

  if (patientToDisplay) {
    return (
      <div className="App">
        <Container textAlign="left">
          <h2>{patientToDisplay.name} ({patientToDisplay.gender})</h2>
          <h3>ssn: {patientToDisplay.ssn} </h3>
          <h3>occupation: {patientToDisplay.occupation} </h3>
          <Button onClick={() => setShowHospitalEntry(1)} >Add hospital entry</Button> 
          <Button onClick={() => setShowHospitalEntry(2)} >Add occupational heathcare entry entry</Button> 
          <Button onClick={() => setShowHospitalEntry(3)} >Add occupational patient health check</Button> 
          { showHospitalEntry === 1 ? <HospitalEntryForm showForm={setShowHospitalEntry} patient={patientToDisplay} /> : null} 
          { showHospitalEntry === 2 ? <OccupationalHealthcare showForm={setShowHospitalEntry} patient={patientToDisplay} /> : null} 
          { showHospitalEntry === 3 ? <HealthCheckForm showForm={setShowHospitalEntry} patient={patientToDisplay} /> : null} 
          <h2>entries: </h2>
          {patientToDisplay.entries.map(entry => {
            {console.log('entry :>> ', entry);}
            switch (entry.type) {
              case 'Hospital':
                
                return (
                  <div className="ui segment"  key={entry.id} >
                    <strong style={{fontSize: '1.5em'}}>{entry.date}</strong> <Icon name='hospital' size='big'/>
                    <p>{entry.description}</p>
                    <List as='ul'>
                      {!entry.diagnosisCodes ? null : entry.diagnosisCodes.map(code => {
                        return (
                          <div key={code.toString()} style={{paddingLeft: '3em'}} >
                            <List.Item as='li'  >
                            {code}
                            </List.Item>
                          </div>
                        );
                      })}
                    </List>
                  </div>
                );
                
              case 'OccupationalHealthcare':
                console.log('entry :>> ', entry);
                return (
                  <div className="ui segment"  key={entry.id} >
                    <strong style={{fontSize: '1.5em'}}>{entry.date}</strong> <Icon name='user doctor' size='big'/>
                    {entry.description? <p>{entry.description}</p>: null}
                  </div>
                );
              case 'HealthCheck':
                console.log('entry :>> ', entry);
                  console.log('entry.healthCheckRating :>> ', entry.healthCheckRating);
                  return (
                    <div className="ui segment"  key={entry.id} >
                      <strong style={{fontSize: '1.5em'}}>{entry.date}</strong> <Icon name='heartbeat' size='big'/>
                      <p>{entry.description}</p>
                      { 
                        entry.healthCheckRating === 0 ? <Icon name='heart' color='red' size='big'/> 
                        : entry.healthCheckRating === 1 ? <Icon name='heart' color='orange' size='big'/>
                        : entry.healthCheckRating === 2 ? <Icon name='heart' color='yellow' size='big'/>
                        : entry.healthCheckRating === 3 ? <Icon name='heart' color='grey' size='big'/>
                        : null
                      }
                    </div>
                  );
              default:
                return(
                  <div>
                    {'ERR'}
                  </div>
                );
            }
            
          })}
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
