import express from "express";
const router = express.Router();
import { getDiagnoses } from '../services/diagnosesService';

router.get('/', async (_reg, res) => {
    const diagnoses = getDiagnoses();
    res.json(diagnoses);
});

export default router;