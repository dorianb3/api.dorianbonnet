const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define an API endpoint to serve articles
app.get('/articles', (req, res) => {
  const articlesDir = path.join(__dirname, 'articles');
  fs.readdir(articlesDir, (err, files) => {
    if (err) {
      console.error('Error reading articles:', err);
      res.status(500).json({ error: 'Failed to read articles' });
    } else {
      const articles = files.map((file, index) => {
        const filePath = path.join(articlesDir, file);
        const articleContent = fs.readFileSync(filePath, 'utf-8');
        const title = getArticleTitle(file);
        return { id: `article${index}`, title, content: articleContent };
      });
      res.json({ articles });
    }
  });
});

// Define an API endpoint to serve individual articles based on title
app.get('/articles/:title', (req, res) => {
  const { title } = req.params;
  const articlesDir = path.join(__dirname, 'articles');
  const fileName = getFileNameFromTitle(title);
  const filePath = path.join(articlesDir, fileName);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading article:', err);
      res.status(500).json({ error: 'Failed to read article' });
    } else {
      res.json({ title, content: data });
    }
  });
});

// Helper function to convert title to filename
const getFileNameFromTitle = (title) => {
  // Convert title to filename by replacing '-' with '_'
  return `${title.replace(/-/g, '_')}.md`;
};

// Helper function to convert filename to title
const getArticleTitle = (fileName) => {
  // Remove file extension (.md) and convert '_' to '-'
  return fileName.replace('.md', '').replace(/_/g, '-');
};

// Start the server
app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

// const cors = require('cors');
// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Define an API endpoint to serve articles
// app.get('/articles', (req, res) => {
//   const articlesDir = path.join(__dirname, 'articles');
//   fs.readdir(articlesDir, (err, files) => {
//     if (err) {
//       console.error('Error reading articles:', err);
//       res.status(500).json({ error: 'Failed to read articles' });
//     } else {
//     const articles = files.map((file, index) => {
//         const filePath = path.join(articlesDir, file);
//         const articleContent = fs.readFileSync(filePath, 'utf-8');
//         return { id: `article${index}`, filename: file, content: articleContent };
//         });
//       res.json({ articles });
//     }
//   });
// });

// // Define an API endpoint to serve individual articles
// app.get('/articles/:filename', (req, res) => {
//   const { filename } = req.params;
//   const articlesDir = path.join(__dirname, 'articles');
//   const filePath = path.join(articlesDir, filename);
  
//   fs.readFile(filePath, 'utf-8', (err, data) => {
//     if (err) {
//       console.error('Error reading article:', err);
//       res.status(500).json({ error: 'Failed to read article' });
//     } else {
//       res.json({ filename, content: data });
//     }
//   });
// });

// Start the server
// app.listen(3000, () => {
//   console.log('API server is running on port 3000');
// });
