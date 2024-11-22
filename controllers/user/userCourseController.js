const { UserCourse, Content, Course } = require('../../models');

const incrementInProgress = async (req, res) => {
  const {course_id, direction, user_id} = req.body; // Course ID from the request body

  try {
    // Find the course with its associated category and contents
    const course = await UserCourse.findOne({
      where: { id: course_id },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: Content,
              as: 'contents', // This matches the alias defined in the Course model
            },
          ],
        }
      ],
    });
    if (!course) {
      return res.status(404).json({ message: 'User is not linked with Course' });
    }

    const countContent = course.course.contents.length;
    if(course_id && user_id === course.user_id && course.course_id ){
    if (direction === 'next') {
      if (course.progress < countContent) {
        course.progress += 1;
      } else {
        return res.status(400).json({ message: 'No more contents to progress to' });
      }
    } else if (direction === 'previous') {
      if (course.progress > 1) {
        course.progress -= 1;
      } else {
        return res.status(400).json({ message: 'Already at the first content' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid direction, use "next" or "previous"' });
    }
    if (course.progress === countContent) {
      course.status = 'completed';
    } else {
      course.status = 'not_completed'; 
    }
  }else
  {
    return res.status(400).json({ message: 'You have already provided review' });
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
const createUserCourse = async (req, res) => {
  const { user_id, course_id } = req.body;

  // Validate that user_id and course_id are provided
  if (!user_id || !course_id) {
    return res.status(400).json({ message: 'user_id and course_id are required' });
  }
   userCourse=await UserCourse.findByPk(user_id);

  try {
    if(userCourse.course_id == course_id){
      return res.status(400).json({ message: 'user is already assigned with course' });
    }
    const newUserCourse = await UserCourse.create({
      user_id,          // Provided by the frontend
      course_id,        // Provided by the frontend
      comment: null,    // Default value
      progress: 1,      // Default value
      rating: 1,        // Default value
      status: 'not_completed',  // Default value
    });

    return res.status(201).json({
      message: 'Course started successfully',
      data: newUserCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while starting the course' });
  }
};
module.exports = {
  incrementInProgress, createUserCourse
};
