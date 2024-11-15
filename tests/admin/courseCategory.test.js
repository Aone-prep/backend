// courseCategoryController.test.js
const { getAllCourseCategories, getCourseCategoryById, createCourseCategory, updateCourseCategory, deleteCourseCategory } = require('../../controllers/admin/courseCategoryController');
const { CourseCategory } = require('../../models');
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (params = {}, body = {}) => {
  return {
    params,
    body
  };
};

jest.mock('../../models');  // Mock the CourseCategory model

describe('Course Category Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllCourseCategories
  describe('getAllCourseCategories', () => {
    it('should return all categories successfully', async () => {
      // Arrange
      const categories = [{ id: 1, category_name: 'Test Category', status: 'active' }];
      CourseCategory.findAll.mockResolvedValue(categories);  // Mock the model method
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllCourseCategories(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(categories);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error when the database fails', async () => {
      // Arrange
      CourseCategory.findAll.mockRejectedValue(new Error('Database error'));
      const req = mockRequest();
      const res = mockResponse();

      // Act
      await getAllCourseCategories(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for getCourseCategoryById
  describe('getCourseCategoryById', () => {
    it('should return category by ID', async () => {
      // Arrange
      const category = { id: 1, category_name: 'Test Category', status: 'active' };
      CourseCategory.findByPk.mockResolvedValue(category);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseCategoryById(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith(category);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if category not found', async () => {
      // Arrange
      CourseCategory.findByPk.mockResolvedValue(null);  // Simulate no category found
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseCategoryById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should handle errors', async () => {
      // Arrange
      CourseCategory.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await getCourseCategoryById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  // Test for createCourseCategory
  describe('createCourseCategory', () => {
    it('should create a new category successfully', async () => {
      // Arrange
      const newCategory = { id: 1, category_name: 'New Category', status: 'active' };
      CourseCategory.create.mockResolvedValue(newCategory);
      const req = mockRequest({}, { category_name: 'New Category', status: 'active' });
      const res = mockResponse();

      // Act
      await createCourseCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newCategory);
    });

    it('should return error if the creation fails', async () => {
      // Arrange
      CourseCategory.create.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({}, { category_name: 'New Category', status: 'active' });
      const res = mockResponse();

      // Act
      await createCourseCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });


  // Test for deleteCourseCategory
  describe('deleteCourseCategory', () => {
    it('should delete category successfully', async () => {
      // Arrange
      const category = { id: 1, category_name: 'Test Category', status: 'active', destroy: jest.fn().mockResolvedValue() };
      CourseCategory.findByPk.mockResolvedValue(category);
    //   CourseCategory.prototype.destroy = jest.fn().mockResolvedValue();
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteCourseCategory(req, res);

      // Assert
      expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
    });

    it('should return 404 if category to delete is not found', async () => {
      // Arrange
      CourseCategory.findByPk.mockResolvedValue(null);
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteCourseCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      CourseCategory.findByPk.mockRejectedValue(new Error('Database error'));
      const req = mockRequest({ id: '1' });
      const res = mockResponse();

      // Act
      await deleteCourseCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
