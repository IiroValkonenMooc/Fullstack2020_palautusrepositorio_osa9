import express from 'express'
import { calculateBmi } from './bmiCalculator';
const http = require('http')

const app = express()

app.get(/^\/bmi.*/, function (req, res) {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: "malformatted parameters" })
    } else {
        const bmi = calculateBmi(height, weight)

        const retObject = {
            weight,
            height,
            bmi
        }

        res.send(retObject)
    }
})

app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!')
})

http.createServer(app).listen(3003, () => {
    console.log('Listening to port 3003');
})
