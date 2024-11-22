// const { UserTest, Question, MockTest, Result } = require('../../models');

// // Submit the result for a mock test
// exports.submitMockTestResult = async (req, res) => {
//     const { userId, mockTestId, answers } = req.body; // answers is an array of user answers

//     try {
//         // Fetch all the questions related to the mock test
//         const questions = await Question.findAll({
//             where: { mock_test_id: mockTestId },
//             include: [{ model: MockTest, as: 'mockTest' }] // MockTest is related
//         });

//         if (questions.length === 0) {
//             return res.status(404).json({ message: 'No questions found for this mock test' });
//         }

//         let totalScore = 0;
//         const fullMark = questions.length; // Full marks is the number of questions
//         const passMark = Math.ceil(fullMark * 0.6); // Passing mark: 60% of the total marks

//         // Loop through each question and compare the user’s answer
//         for (const question of questions) {
//             // Find the user's answer for this question
//             const userAnswer = answers.find(answer => answer.questionId === question.id);

//             if (userAnswer) {
//                 // If the user's selected option matches the correct answer
//                 if (userAnswer.selectedOption === question.answer) {
//                     totalScore += 1; // Increment score for correct answers
//                 }
//             }
//         }

//         // Store the result in the Result model
//         const result = await Result.create({
//             description: 'Mock test result for user ' + userId,
//             obtained_mark: totalScore,
//             pass_mark: passMark,
//             full_mark: fullMark,
//             highest_mark: fullMark // Highest mark is the full mark of the test
//         });

//         // Respond with the test result and score
//         res.json({
//             message: 'Mock Test submitted successfully',
//             totalScore,
//             passMark,
//             fullMark,
//             resultId: result.id,
//             passed: totalScore >= passMark // Check if the user passed
//         });

//     } catch (error) {
//         res.status(404).json({ message: 'Error submitting the test result' });
//     }
// };

const { UserTest, Question, MockTest, User } = require('../../models');

// Submit the result for a mock test
exports.submitMockTestResult = async (req, res) => {
    const { userId, mockTestId, answers } = req.body; // answers is an array of user answers

    try {
        // Fetch all the questions related to the mock test
        const questions = await Question.findAll({
            where: { mock_test_id: mockTestId },
            include: [{ model: MockTest, as: 'mockTest' }] // MockTest is related
        });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this mock test' });
        }

        let totalScore = 0;
        const fullMark = questions.length; // Full marks is the number of questions
        const passMark = Math.ceil(fullMark * 0.6); // Passing mark: 60% of the total marks

        // Loop through each question and compare the user’s answer
        for (const question of questions) {
            // Find the user's answer for this question
            const userAnswer = answers.find(answer => answer.questionId === question.id);

            if (userAnswer) {
                // If the user's selected option matches the correct answer
                if (userAnswer.selectedOption === question.answer) {
                    totalScore += 1; // Increment score for correct answers
                }
            }
        }
    // Determine if the user passed
        const passed = totalScore >= passMark;

   // Create the UserTest entry to store the result
        const userTest = await UserTest.create({
            description: 'Mock test result for user ' + userId,
            obtained_mark: totalScore,
            pass_mark: passMark,
            full_mark: fullMark,
            highest_mark: fullMark, // Highest mark is the full mark of the test
            passed: passed, // Store whether the user passed or not
            user_id: userId, // Link to the user
            mocktest_id: mockTestId, // Link to the mock test
        });
        
        // Respond with the test result and score
        res.json({
            message: 'Mock Test submitted successfully',
            totalScore,
            passMark,
            fullMark,
            userTestId: userTest.id, // Include the ID of the newly created UserTest entry
         //   passed: totalScore >= passMark // Check if the user passed
            passed: passed
        });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error submitting the test result' });
    }
};