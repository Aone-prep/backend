const { UserCourse, Content, Course } = require('../../models');

exports. incrementInProgress = async (req, res) => {
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
exports. createUserCourse = async (req, res) => {
  const { user_id, course_id } = req.body;

  // Validate that user_id and course_id are provided
  if (!user_id || !course_id) {
    return res.status(400).json({ message: 'user_id and course_id are required' });
  }
   userCourse=await UserCourse.findOne(
    {where:{user_id:user_id}});

  try {
    if(userCourse){
    if(userCourse.course_id == course_id){
      return res.status(400).json({ message: 'user is already assigned with course' });
    }
  }
    const newUserCourse = await UserCourse.create({
      user_id,          
      course_id,        
      comment: null,    
      progress: 1,      
      rating: 1,        
      status: 'in_progess',  
    });
    const userCourseDetails = await Course.findOne({
      where: { id: newUserCourse.course_id }});

    return res.status(201).json({
      message: 'Course started successfully',
      data: userCourseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while starting the course' });
  }
};

exports. userRating = async (req,res) => {
  const { user_id, course_id, rating } = req.body;

  // Input validation
  if (!user_id || !course_id || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({
      message: 'Invalid input. Please ensure user_id, course_id, and rating (1-5) are provided.',
    });
  }

  try {
    // Step 1: Check if the user has already rated the course
    const existingRating = await UserCourse.findOne({
      where: { user_id, course_id },
    });

    if (existingRating) {
      // Step 2: If the user has already rated, update the rating
      await existingRating.update({ rating });

      return res.status(200).json({
        message: 'Rating updated successfully',
        usercourse: existingRating,
      });
    } else {
      // Step 3: If no rating exists, create a new record
      const newRating = await UserCourse.create({ user_id, course_id, rating });

      return res.status(201).json({
        message: 'Rating saved successfully',
        data: newRating,
      });
    }
  } catch (error) {
    console.error('Error in userRating function:', error);
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
}

// In userCourseController.js

exports.getUserCourses = async (req, res) => {
  const { id } = req.params; // Get user_id from the request parameters
  
  try {
    // Find all UserCourse records associated with the user
    const userCourses = await UserCourse.findAll({
      where: { user_id: id }, // Filter by user_id
      include: [
        {
          model: Course,  // Include related course information
          as: "course",
          include: [
            {
              model: Content,
              as: "contents",
            },
          ],
        },
      ],
    });

    if (userCourses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this user' });
    }

    return res.status(200).json({
      message: 'User courses retrieved successfully',
      data: userCourses, // Send the user courses data with associated courses
    });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return res.status(500).json({ message: 'Failed to fetch user courses', error: error.message });
  }
};

