module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample data for contents
    const demoContents = [
      {
        title: 'Introduction to Node.js',
        body: 'Learn the basics of Node.js, an open-source runtime for building scalable applications.',
        courseId: 1,  // Assuming a course with ID 1 exists
        type: 'text',
        mediaUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Node.js Image Guide',
        body: 'A comprehensive guide to handling images in Node.js applications.',
        courseId: 1,  // Assuming a course with ID 1 exists
        type: 'image',
        mediaUrl: 'https://example.com/images/nodejs-image-guide.png',  // URL to image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Advanced Video Tutorials on Node.js',
        body: 'In-depth video tutorials covering advanced Node.js topics.',
        courseId: 1,  // Assuming a course with ID 1 exists
        type: 'video',
        mediaUrl: 'https://example.com/videos/nodejs-advanced.mp4',  // URL to video
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'JavaScript Basics',
        body: 'Introduction to JavaScript for beginners.',
        courseId: 2,  // Assuming a course with ID 2 exists
        type: 'text',
        mediaUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'JavaScript Image Overview',
        body: 'A brief overview of JavaScript with some visual illustrations.',
        courseId: 2,  // Assuming a course with ID 2 exists
        type: 'image',
        mediaUrl: 'https://example.com/images/js-overview.png',  // URL to image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Inserting the demo content data into the 'Contents' table
    await queryInterface.bulkInsert('Contents', demoContents);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the seeder data (if necessary)
    await queryInterface.bulkDelete('Contents', null, {});
  },
};
