import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import http from 'http';

const app = express();

app.use(express.json());

app.get(/^\/bmi.*/, (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBmi(height, weight);

        const retObject = {
            weight,
            height,
            bmi
        };

        res.send(retObject);
    }
});

app.post('/excercise', (reg, res) => {
    interface body  {
        daily_exercises: Array<number>,
        target: number
    } 

    const body: body = reg.body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    if(!body.daily_exercises || !body.target) {
        res.send({ error: "parameters missing" });
    } else if( typeof(body.target) !== 'number' || !Array.isArray( body.daily_exercises ) || body.daily_exercises.length === 0 || typeof(body.daily_exercises[0]) !== 'number' ){
        res.send({ error: "malformatted parameters" });
    } else {
        const response = calculateExercises(body.daily_exercises, body.target);

        res.send(response);
    }
});

app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});

http.createServer(app).listen(3003, () => {
    console.log('Listening to port 3003');
});
