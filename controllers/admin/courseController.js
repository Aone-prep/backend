const {CourseCategory, Course, Content } = require('../../models');

// Get all courses with filters for recently added and popular by rating
exports.getAllCourses = async (req, res) => {
    try {
        // Get filters from query parameters
        const { sortBy } = req.query;

        let order = [];

        // Define sorting behavior
        if (sortBy === 'recent') {
            // Sort by creation date for recently added courses
            order = [['createdAt', 'DESC']];
        } else if (sortBy === 'rating') {
            // Sort by rating for popular courses
            order = [['rating', 'DESC']];
        }

        // Fetch courses with the defined sorting
        const courses = await Course.findAll({
            include: [
                { model: CourseCategory, as: 'category' },
                { model: Content, as: 'contents' }
            ],
            order
        });

        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found matching the criteria' });
        }

        res.json(courses);
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ message: 'An error occurred while fetching courses' });
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    const course_id = req.params.id;
    try {
        const course = await Course.findOne(
            {
                where: { id: course_id },
                include: [{
                    model: CourseCategory,
                    as: 'category'
                },
                {
                    model: Content,
                    as: 'Contents'
                 }
            ]
            }
            );
        
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a course
exports.createCourse = async (req, res) => {
    try {
        const { course_name, description, duration, level, category_id,in_progress=0,status=0 } = req.body;
        const course = await Course.create({ course_name, description, duration, level, category_id,in_progress,status });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const { course_name, description, duration, level, category_id, in_progress, status } = req.body;
        await course.update({ course_name, description, duration, level, category_id,in_progress,status });
        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        await course.destroy();
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};