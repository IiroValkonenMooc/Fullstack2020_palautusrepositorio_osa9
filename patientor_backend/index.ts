import express from 'express';
import cors from 'cors';
import http from 'http';

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_reg, res) => {
    res.send('pong');
});

http.createServer(app).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});