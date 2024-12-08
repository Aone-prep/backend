const { UserTest, Question, MockTest, User } = require("../../models");

exports.submitMockTestResult = async (req, res) => {
  const { testId, answers } = req.body;
  const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

  try {
    // Fetch all the questions related to the mock test
    const questions = await Question.findAll({
      where: { mock_test_id: testId },
      include: [{ model: MockTest, as: "mockTest" }],
    });

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this mock test" });
    }

    let totalScore = 0;
    const fullMark = questions.length; // Full marks is the number of questions
    const passMark = Math.ceil(fullMark * 0.6); // Passing mark: 60% of the total marks

    // Prepare detailed results for each question
    const detailedResults = questions.map((question) => {
      // Find the user's answer for this question
      const userAnswer = answers[question.id];

      // Check if the answer is correct
      const isCorrect = userAnswer === question.answer;

      if (isCorrect) {
        totalScore += 1; // Increment score for correct answers
      }

      return {
        questionId: question.id,
        userAnswer: userAnswer,
        correctAnswer: question.answer,
        isCorrect: isCorrect,
      };
    });

    // Determine if the user passed
    const passed = totalScore >= passMark;

    // Create the UserTest entry to store the result
    const userTest = await UserTest.create({
      description: `Mock test result for user ${userId}`,
      obtained_mark: totalScore,
      pass_mark: passMark,
      full_mark: fullMark,
      highest_mark: fullMark,
      passed: passed,
      user_id: userId,
      mocktest_id: testId,
    });

    // Respond with comprehensive test result
    res.json({
      message: "Mock Test submitted successfully",
      result: {
        totalScore,
        passMark,
        fullMark,
        passed,
        userTestId: userTest.id,
        detailedResults,
      },
    });
  } catch (error) {
    console.error("Mock Test Submission Error:", error);
    res.status(500).json({
      message: "Error submitting the test result",
      error: error.message,
    });
  }
};

// Get all mock tests given by a specific user
exports.getUserTests = async (req, res) => {
  try {
    // Fetch all tests given by the user, including mock test details
    const userTests = await UserTest.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: MockTest, // Include mock test details
          as: "mockTest",
        },
      ],
    });

    // Return the test results
    res.json({
      message: "Tests fetched successfully",
      data: userTests,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Error fetching the test results" });
  }
};
