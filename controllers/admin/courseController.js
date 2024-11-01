const {CourseCategory, Course } = require('../../models');

// Get all courses
exports.getAllCourses = async (req, res) => {
    
    try {
        const courses = await Course.findAll(
            {
            include: [{
                model:CourseCategory,
                as: 'category'
            }]

    });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
                }]
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
        const { course_name, description, duration, level, category_id } = req.body;
        const course = await Course.create({ course_name, description, duration, level, category_id });
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
        const { course_name, description, duration, level, category_id } = req.body;
        await course.update({ course_name, description, duration, level, category_id });
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