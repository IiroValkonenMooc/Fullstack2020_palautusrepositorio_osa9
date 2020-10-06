import express from 'express';
import cors from 'cors';
import http from 'http';
require('express-async-errors');
import patientsRouter from "./routes/patientsRouter";
import diagnosesRouter from "./routes/diagnosesRouter";

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_reg, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

http.createServer(app).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});