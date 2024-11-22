const { Content, Course } = require('../../models');
const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} = require('../../controllers/admin/contentController');

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

jest.mock('../../models');  // Mock the Content and Course models
describe('createContent', () => {
    it('should create new content successfully', async () => {
      // Arrange
      const newContent = {
        title: 'Content Title',
        body: 'Content Body',
        courseId: 1,
        type: 'text',
        mediaUrl: null,
      };
      const course = { id: 1, course_name: 'Course 1' };
      Course.findByPk.mockResolvedValue(course);  // Mock finding the course
      Content.create.mockResolvedValue(newContent);  // Mock creating content
  
      const req = mockRequest({}, newContent);
      const res = mockResponse();
  
      // Act
      await createContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newContent);
    });
  
    it('should return 404 if course not found', async () => {
      // Arrange
      Course.findByPk.mockResolvedValue(null);  // Simulate no course found
      const req = mockRequest({}, { title: 'Content Title', body: 'Body', courseId: 999 });
      const res = mockResponse();
  
      // Act
      await createContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Course not found' });
    });
  
    it('should return 400 if mediaUrl is missing for image/video content', async () => {
      // Arrange
      const newContent = {
        title: 'Content Title',
        body: 'Content Body',
        courseId: 1,
        type: 'image',
        mediaUrl: '',  // Missing media URL
      };
      const course = { id: 1, course_name: 'Course 1' };
      Course.findByPk.mockResolvedValue(course);
  
      const req = mockRequest({}, newContent);
      const res = mockResponse();
  
      // Act
      await createContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Media URL is required for image/video content' });
    });
  
    it('should handle errors during content creation', async () => {
      // Arrange
      Course.findByPk.mockResolvedValue({ id: 1 });
      Content.create.mockRejectedValue(new Error('Error creating content'));
  
      const req = mockRequest({}, { title: 'Content Title', body: 'Body', courseId: 1 });
      const res = mockResponse();
  
      // Act
      await createContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating content' });
    });
  });
describe('getAllContent', () => {
    it('should return all content with their associated courses', async () => {
      // Arrange
      const contents = [
        {
          id: 1,
          title: 'Content 1',
          body: 'Body of Content 1',
          type: 'text',
          courseId: 1,
          course: { id: 1, course_name: 'Course 1' },
        },
      ];
      Content.findAll.mockResolvedValue(contents);  // Mock retrieving content with courses
  
      const req = mockRequest();
      const res = mockResponse();
  
      // Act
      await getAllContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(contents);
    });
  
    it('should handle errors while fetching all contents', async () => {
      // Arrange
      Content.findAll.mockRejectedValue(new Error('Error fetching content'));
      const req = mockRequest();
      const res = mockResponse();
  
      // Act
      await getAllContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching contents' });
    });
  });
describe('getContentById', () => {
    it('should return content by ID', async () => {
      // Arrange
      const content = {
        id: 1,
        title: 'Content Title',
        body: 'Content Body',
        courseId: 1,
        course: { id: 1, course_name: 'Course 1' },
      };
      Content.findByPk.mockResolvedValue(content);  // Mock finding content by ID
  
      const req = mockRequest({ contentId: '1' });
      const res = mockResponse();
  
      // Act
      await getContentById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(content);
    });
  
    it('should return 404 if content not found', async () => {
      // Arrange
      Content.findByPk.mockResolvedValue(null);  // Simulate no content found
      const req = mockRequest({ contentId: '1' });
      const res = mockResponse();
  
      // Act
      await getContentById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Content not found' });
    });
  
    it('should handle errors while fetching content by ID', async () => {
      // Arrange
      Content.findByPk.mockRejectedValue(new Error('Error fetching content'));
      const req = mockRequest({ contentId: '1' });
      const res = mockResponse();
  
      // Act
      await getContentById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching content' });
    });
  });
// describe('updateContent', () => {
//     it('should update content successfully', async () => {
//       // Arrange
//       const updatedContent = {
//         title: 'Updated Content Title',
//         body: 'Updated Content Body',
//         courseId: 1,
//         type: 'text',
//         mediaUrl: null,
//       };
//       const content = { ...updatedContent, update: jest.fn().mockResolvedValue([1]) };
//       Content.findByPk.mockResolvedValue(content);  // Mock finding content by ID
  
//       const req = mockRequest({ contentId: '1' }, updatedContent);
//       const res = mockResponse();
  
//       // Act
//       await updateContent(req, res);
  
//       // Assert
//       expect(res.json).toHaveBeenCalledWith(updatedContent);
//     });
  
//     it('should return 404 if content not found', async () => {
//       // Arrange
//       Content.findByPk.mockResolvedValue(null);  // Simulate no content found
//       const req = mockRequest({ contentId: '999' }, { title: 'Updated Content' });
//       const res = mockResponse();
  
//       // Act
//       await updateContent(req, res);
  
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Content not found' });
//     });
  
//     it('should handle errors while updating content', async () => {
//       // Arrange
//       Content.findByPk.mockRejectedValue(new Error('Error updating content'));
//       const req = mockRequest({ contentId: '1' }, { title: 'Updated Content' });
//       const res = mockResponse();
  
//       // Act
//       await updateContent(req, res);
  
//       // Assert
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Error updating content' });
//     });
//   });
describe('deleteContent', () => {
    it('should delete content successfully', async () => {
      // Arrange
      const content = { id: 1, title: 'Content Title', destroy: jest.fn().mockResolvedValue() };
      Content.findByPk.mockResolvedValue(content);  // Mock finding content by ID
      const req = mockRequest({ contentId: '1' });
      const res = mockResponse();
  
      // Act
      await deleteContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Content deleted successfully' });
    });
  
    it('should return 404 if content not found', async () => {
      // Arrange
      Content.findByPk.mockResolvedValue(null);  // Simulate no content found
      const req = mockRequest({ contentId: '999' });
      const res = mockResponse();
  
      // Act
      await deleteContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Content not found' });
    });
  
    it('should handle errors during content deletion', async () => {
      // Arrange
      Content.findByPk.mockRejectedValue(new Error('Error deleting content'));
      const req = mockRequest({ contentId: '1' });
      const res = mockResponse();
  
      // Act
      await deleteContent(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting content' });
    });
  });
  