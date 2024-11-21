const { Course, Content, CourseCategory } = require('../models');

const incrementInProgress = async (req, res) => {
  const courseId = req.body.id; // Course ID from the request body
  const direction = req.body.direction; // Direction (next or previous) from the request body

  try {
    // Find the course with its associated category and contents
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
    if (direction === 'next') {
      if (course.in_progress < countContent) {
        course.in_progress += 1;
      } else {
        return res.status(400).json({ message: 'No more contents to progress to' });
      }
    } else if (direction === 'previous') {
      if (course.in_progress > 0) {
        course.in_progress -= 1;
      } else {
        return res.status(400).json({ message: 'Already at the first content' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid direction, use "next" or "previous"' });
    }
    if (course.in_progress === countContent) {
      course.status = 1;
    } else {
      course.status = 0; 
    }

    await course.save();

    return res.status(200).json({
      message: 'Course progress updated successfully',
      course,
      contentCount: countContent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the progress' });
  }
};

module.exports = {
  incrementInProgress,
};
