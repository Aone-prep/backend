const { CourseCategory } = require('../models');

// Get all course categories
exports.getAllCourseCategories = async (req, res) => {
    try {
        const categories = await CourseCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get course category by ID
exports.getCourseCategoryById = async (req, res) => {
    try {
        const category = await CourseCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a course category
exports.createCourseCategory = async (req, res) => {
    try {
        const { category_name, status } = req.body;
        const category = await CourseCategory.create({ category_name, status });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a course category
exports.updateCourseCategory = async (req, res) => {
    try {
        const category = await CourseCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        const { category_name, status } = req.body;
        await category.update({ category_name, status });
        res.json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a course category
exports.deleteCourseCategory = async (req, res) => {
    try {
        const category = await CourseCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};