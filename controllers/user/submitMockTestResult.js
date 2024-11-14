const { MockTest, Question, MockTestResult } = require('../../models');

// Submit the answer for a mock test
exports.submitMockTestResult = async (req, res) => {
    const { userId, mockTestId, selectedOption } = req.body; // `selectedOption` is the user’s answer for the question
    let score = 0;

    try {
        // Fetch the mock test along with its single associated question
        const mockTest = await MockTest.findByPk(mockTestId, {
            include: [{ model: Question, as: 'question' }]
        });

        if (!mockTest || !mockTest.question) {
            return res.status(404).json({ message: 'Mock Test or Question not found' });
        }

        // Check if the selected option matches the correct answer
        if (mockTest.question.answer === selectedOption) {
            score = mockTest.max_score || 1; // Default score is 1 if max_score is not defined
        }

        // Save the result to MockTestResult
        const mockTestResult = await MockTestResult.create({
            userId,
            mockTestId,
            score,
            status: 'completed',
            submittedAt: new Date(),
        });

        res.json({
            message: 'Mock Test submitted successfully and result saved',
            score,
            resultId: mockTestResult.id,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
