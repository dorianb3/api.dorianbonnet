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
        const filenameWithoutExt = path.parse(file).name; // Get filename without extension
        return { id: `article${index}`, filename: filenameWithoutExt, content: articleContent };
      });
      res.json({ articles });
    }
  });
});

// Define an API endpoint to serve individual articles
app.get('/articles/:filename', (req, res) => {
  const { filename } = req.params;
  const articlesDir = path.join(__dirname, 'articles');
  const filePath = path.join(articlesDir, `${filename}.md`); // Add the extension back when reading the file

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading article:', err);
      res.status(500).json({ error: 'Failed to read article' });
    } else {
      res.json({ filename, content: data });
    }
  });
});

// app.get('/articles/:filename/commits', (req, res) => {
//   const { filename } = req.params;
//   const commitHistoryPath = path.join(__dirname, 'commit_history', `${filename}.json`); // Directory to store commit history files
//   fs.readFile(commitHistoryPath, 'utf-8', (err, data) => {
//     if (err) {
//       console.error('Error reading commit history:', err);
//       res.status(500).json({ error: 'Failed to read commit history' });
//     } else {
//       const commitHistory = JSON.parse(data);
//       res.json({ commitHistory });
//     }
//   });
// });

// Start the server
app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

