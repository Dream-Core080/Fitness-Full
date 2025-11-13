const cron = require('node-cron');
const Question = require('../../models/questionModel');
const ExamCategory = require('../../models/examCategoriesModel');

const generateQuestionOTDCron = () => {
    cron.schedule("0 0 * * *", async () => {
        const examCategories = await ExamCategory.find({});
        for(let examCategory of examCategories) {
            const questions = await Question.find({examCategory: examCategory._id});
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

            if(randomQuestion) {
                examCategory.questionOfTheDay = randomQuestion._id;
                await examCategory.save();
            }
            
        }
    });
}

module.exports = {
    generateQuestionOTDCron
}