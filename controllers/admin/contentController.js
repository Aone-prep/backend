const { Content, Course } = require('../models');

// Create new content (supports text, image, and video)
exports.createContent = async (req, res) => {
  try {
    const { title, body, courseId, type, mediaUrl } = req.body;

    // Check if the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If content type is 'image' or 'video', ensure mediaUrl is provided
    if ((type === 'image' || type === 'video') && !mediaUrl) {
      return res.status(400).json({ message: 'Media URL is required for image/video content' });
    }

    // Create the new content
    const content = await Content.create({
      title,
      body,
      courseId,
      type,
      mediaUrl,  // URL or path for the media (for images/videos)
    });

    return res.status(201).json(content);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating content' });
  }
};

// Get all contents
exports.getAllContent = async (req, res) => {
  try {
    // Fetch all content records, including their associated courses
    const contents = await Content.findAll({
      include: {
        model: Course,
        as: 'course',  // Alias for the associated course
      },
    });

    return res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching contents' });
  }
};

// Get content by contentId
exports.getContentById = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Fetch the content by its ID
    const content = await Content.findByPk(contentId, {
      include: {
        model: Course,
        as: 'course',  // Alias for the associated course
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching content' });
  }
};

// Update content by contentId
exports.updateContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, body, courseId, type, mediaUrl } = req.body;

    // Fetch the content by its ID
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Check if the course exists (if courseId is provided)
    if (courseId) {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
    }

    // If content type is 'image' or 'video', ensure mediaUrl is provided
    if ((type === 'image' || type === 'video') && !mediaUrl) {
      return res.status(400).json({ message: 'Media URL is required for image/video content' });
    }

    // Update the content
    const updatedContent = await content.update({
      title,
      body,
      courseId,
      type,
      mediaUrl,
    });

    return res.status(200).json(updatedContent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating content' });
  }
};

// Delete content by contentId
exports.deleteContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Find and delete the content
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Delete the content
    await content.destroy();

    return res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting content' });
  }
};
