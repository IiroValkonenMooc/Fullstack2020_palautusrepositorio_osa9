import express from 'express';
import http from 'http';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/ping', (_reg, res) => {
    res.send('pong');
});

http.createServer(app).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});