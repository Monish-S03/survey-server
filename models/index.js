const sequelize = require('../config/db');
const User = require('./User');
const Survey = require('./Survey');
const Question = require('./Question');
const Option = require('./Option');
const Response = require('./Response');
const Answer = require('./Answer');

//many Surveys
User.hasMany(Survey, { foreignKey: 'userId' });
Survey.belongsTo(User, { foreignKey: 'userId' });

//many Questions
Survey.hasMany(Question, { foreignKey: 'surveyId', onDelete: 'CASCADE' });
Question.belongsTo(Survey, { foreignKey: 'surveyId' });

//many Options
Question.hasMany(Option, { foreignKey: 'questionId', onDelete: 'CASCADE' });
Option.belongsTo(Question, { foreignKey: 'questionId' });

// Response
// many Responses
User.hasMany(Response, { foreignKey: 'userId' });
Response.belongsTo(User, { foreignKey: 'userId' });

Survey.hasMany(Response, { foreignKey: 'surveyId', onDelete: 'CASCADE' });
Response.belongsTo(Survey, { foreignKey: 'surveyId' });

// Answers
Response.hasMany(Answer, { foreignKey: 'responseId', onDelete: 'CASCADE' });
Answer.belongsTo(Response, { foreignKey: 'responseId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

Option.hasMany(Answer, { foreignKey: 'optionId' });
Answer.belongsTo(Option, { foreignKey: 'optionId' });

module.exports = {
    sequelize,
    User,
    Survey,
    Question,
    Option,
    Response,
    Answer
};
