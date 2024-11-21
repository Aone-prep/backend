const { Course, Content, CourseCategory } = require('../models');  

const incrementInProgress = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: CourseCategory,
          as: 'category', 
        },
        {
          model: Content,
          as: 'contents',
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const countContent = course.contents.length; 

    if (course.in_progress < countContent) {
      course.in_progress += 1; 
    } else {
      course.status = 1;
      return res.status(400).json({ message: 'Progress is completed' });
    }

    await course.save(); // Save the updated course progress

    return res.status(200).json({
      message: 'Course progress saved successfully',
      course,
      contentCount: countContent, // Return the count of associated contents
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the progress' });
  }
};

module.exports = {
  incrementInProgress,
};
