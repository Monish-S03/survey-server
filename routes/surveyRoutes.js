const express = require('express');
const { createSurvey, getAllSurveys, getSurvey, submitResponse, getSurveyResults } = require('../controllers/surveyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createSurvey);
router.get('/', getAllSurveys); 
router.get('/:id', getSurvey);
router.post('/response', authMiddleware, submitResponse);
router.get('/:id/results', authMiddleware, getSurveyResults);

module.exports = router;
