"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require('express-async-errors');
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const PORT = 3001;
const app = express_1.default();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/api/ping', (_reg, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
http_1.default.createServer(app).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
