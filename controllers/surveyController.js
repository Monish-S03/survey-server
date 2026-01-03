const { Survey, Question, Option, Response, Answer, User } = require('../models');

exports.createSurvey = async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const survey = await Survey.create({ title, description, userId: req.user.id });

        for (const q of questions) {
            const question = await Question.create({
                text: q.text,
                type: q.type,
                surveyId: survey.id,
            });

            if (q.options && q.options.length > 0) {
                for (const o of q.options) {
                    await Option.create({ text: o.text, questionId: question.id });
                }
            }
        }

        res.status(201).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.findAll({ include: [User] });
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSurvey = async (req, res) => {
    try {
        const survey = await Survey.findByPk(req.params.id, {
            include: [
                {
                    model: Question,
                    include: [Option],
                },
            ],
        });
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitResponse = async (req, res) => {
    try {
        const { surveyId, answers } = req.body;
        //Response
        const response = await Response.create({
            surveyId,
            userId: req.user.id,
        });

        //Answers
        for (const ans of answers) {
            await Answer.create({
                responseId: response.id,
                questionId: ans.questionId,
                optionId: ans.optionId || null,
                text: ans.text || null,
            });
        }

        res.status(201).json({ message: 'Response submitted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSurveyResults = async (req, res) => {
    try {
        const survey = await Survey.findByPk(req.params.id, {
            include: [
                {
                    model: Question,
                    include: [Option, Answer],
                },
                {
                    model: Response
                }
            ],
        });

        // Process data for charts
        // For each question, count answers
        // This logic can be refined for specific chart formats

        res.json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
