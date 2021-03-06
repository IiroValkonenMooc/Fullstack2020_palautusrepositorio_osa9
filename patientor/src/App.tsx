import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient, RouteMatchId } from "./types";

import PatientListPage from "./PatientListPage";
import SinglePatientPage from './SinglePatientPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  const match = useRouteMatch("/patients/:id");
  let params: RouteMatchId;
  if(match){
    params = match.params;
    console.log('match :>> ', params);
  }

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
          </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id" render={() => <SinglePatientPage id={params.id} />} />
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
