const { Question,MockTest,QuestionType } = require('../../models');

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll(
            {
                include: [
                    {
                        model: MockTest,
                        as: 'mockTest'  // Ensure the alias is correct
                    },
                    {
                        model: QuestionType,
                        as: 'questionType'  // Ensure the alias is correct
                    }
                ]
        }
        );
        res.json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get question by ID
exports.getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findOne(
            {
                where: { id: id },
                include: [
                    {
                        model: MockTest,
                        as: 'mockTest'  
                    },
                    {
                        model: QuestionType,
                        as: 'questionType'
                    }
                ]
            }
        
        );
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new question
exports.createQuestion = async (req, res) => {
    const { description, optionA, optionB, optionC, optionD, answer, mock_test_id,question_type_id, status } = req.body;
    try {
        created_by="Admin";
        const question = await Question.create({ description, optionA, optionB, optionC, optionD, answer, mock_test_id, question_type_id,status,created_by });
        res.json({ message: 'Question Added Successfully' });
        // res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update question by ID
exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { description, optionA, optionB, optionC, optionD, answer, status } = req.body;
    try {
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        await question.update({ description, optionA, optionB, optionC, optionD, answer, status });
        res.json({ message: 'Question updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete question by ID
exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        await question.destroy();
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};