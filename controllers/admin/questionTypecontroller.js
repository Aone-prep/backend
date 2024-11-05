const { QuestionType } = require('../../models');

// Get all questions
exports.getAllQuestionType = async (req, res) => {
    try {
        const qtype = await QuestionType.findAll();
        res.json(qtype);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get question by ID
exports.getQuestionTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const qtype = await QuestionType.findByPk(id);
        if (!qtype) return res.status(404).json({ message: 'Question Type not found' });
        res.json(qtype);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new question
exports.createQuestionType = async (req, res) => {
    const { name, status } = req.body;
    try {
        const qtype = await QuestionType.create({ name, status });
        res.status(201).json(qtype);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update question by ID
exports.updateQuestionType = async (req, res) => {
    
    try {
        const qtype = await QuestionType.findByPk(req.params.id);
        if (!qtype) return res.status(404).json({ message: 'Question Type not found' });
        const { name, status } = req.body;
        const{id} = req.params;
        await QuestionType.update(
        {name, status },
        {where:{id}});
        res.json({ message: 'Question Type updated successfully',QuestionType });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete question by ID
exports.deleteQuestionType = async (req, res) => {
    const { id } = req.params;
    try {
        const qtype = await QuestionType.findByPk(id);
        if (!qtype) return res.status(404).json({ message: 'Question Type not found' });
        await QuestionType.destroy({where:{id}});
        res.json({ message: 'Question Type deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};